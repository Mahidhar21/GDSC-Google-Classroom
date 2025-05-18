import mongoose from "mongoose";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import Classroom from "../models/classroom.js";
import User from "../models/user.js";
import Announcement from "../models/announcement.js";

function generateNanoId() {
  const id = nanoid(7);
  return id;
}

const handleGetAllClassrooms = async (req, res) => {
  try {
    // Get the token from cookies
    const token = req.cookies.authToken;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Login to view classrooms" });
    }

    // Decode the token to get the student ID
    let studentId;
    try {
      const decoded = jwt.verify(token, process.env.JSON_SECRET_KEY);
      studentId = decoded.id; // Assuming the token contains the user ID directly
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: Invalid token" });
    }

    // Find the student by ID
    const student = await User.findOne({ _id: studentId });
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    // Check if the student is enrolled in any classrooms
    if (
      !student.enrolledClassrooms ||
      student.enrolledClassrooms.length === 0
    ) {
      return res.status(200).json({
        success: true,
        message: "No classrooms found",
        classrooms: [],
      });
    }

    // Fetch all classrooms the student is enrolled in
    const classrooms = [];
    for (const classroomId of student.enrolledClassrooms) {
      try {
        const classroom = await Classroom.findOne({ _id: classroomId });
        if (classroom) {
          classrooms.push(classroom);
        }
      } catch (error) {
        console.error(
          `Error fetching classroom with ID ${classroomId}:`,
          error
        );
      }
    }

    // Send the response with all fetched classrooms
    return res.status(200).json({
      success: true,
      message: "All classrooms fetched successfully",
      classrooms,
    });
  } catch (error) {
    console.error("Error in fetching all classroom data:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching classrooms",
    });
  }
};

const handleCreateClassroom = async (req, res) => {
  try {
    // Generate a unique shortId for the classroom
    const id = generateNanoId();

    // Extract and verify the creator's token
    const token = req.cookies.authToken;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Login to create classroom" });
    }
    //Getting creator data.
    let creator;
    try {
      const decoded = jwt.verify(token, process.env.JSON_SECRET_KEY); // Decode the token
      creator = decoded;
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: Invalid token" });
    }

    // Validate the incoming data
    const { className, section, description, subject } = req.body;
    if (!className || !section || !subject) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Create the classroom
    const newClassroom = await Classroom.create({
      className,
      section,
      description,
      subject,
      shortId: id,
      teachers: [creator],
    });

    // Send a success response
    return res.status(201).json({
      success: true,
      message: "Classroom created successfully",
      classroom: newClassroom,
    });
  } catch (error) {
    console.error("Error creating classroom:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the classroom",
    });
  }
};

const handleJoinClassroom = async (req, res) => {
  try {
    // Get the student's token from cookies
    const token = req.cookies.authToken;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Login to join classroom" });
    }

    // Decode the token to get the student ID
    let studentId;
    try {
      const decoded = jwt.verify(token, process.env.JSON_SECRET_KEY);
      studentId = decoded.id; // Assuming the token contains the user ID directly
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: Invalid token" });
    }

    // Get the classroom code from the request headers
    const classCode = req.headers.code;
    if (!classCode) {
      return res
        .status(400)
        .json({ success: false, message: "Classroom code is required" });
    }

    // Find the classroom by its shortId
    const classroom = await Classroom.findOne({ shortId: classCode });
    if (!classroom) {
      return res
        .status(404)
        .json({ success: false, message: "Classroom not found" });
    }

    // Check if the student is already enrolled
    if (classroom.enrolledStudents.includes(studentId)) {
      return res.status(400).json({
        success: false,
        message: "You are already enrolled in this classroom",
      });
    }

    // Add the student to the classroom's enrolledStudents array
    classroom.enrolledStudents.push(studentId);
    await classroom.save();

    // Find the student and add the classroom to their enrolledClassrooms array
    const student = await User.findOne({ _id: studentId });
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    student.enrolledClassrooms.push(classroom._id);
    await student.save();

    // Send a success response
    return res.status(200).json({
      success: true,
      message: "Successfully joined the classroom",
      classroom: {
        id: classroom._id,
        className: classroom.className,
        section: classroom.section,
        subject: classroom.subject,
      },
    });
  } catch (error) {
    console.error("Error joining classroom:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while joining the classroom",
    });
  }
};

const handleGetClassroom = async (req, res) => {
  try {
    // Get the token from cookies
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access: Please log in",
      });
    }

    // Decode the token to verify the user
    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JSON_SECRET_KEY);
      userId = decoded.id; // Assuming the token contains the user ID directly
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: Invalid token" });
    }

    // Get the classroom ID from the request parameters//send the shortId to the backend API call.
    const classroomId = req.params.id;
    if (!classroomId) {
      return res
        .status(400)
        .json({ success: false, message: "Classroom ID is required" });
    }

    // Find the classroom by its shortId
    const classroom = await Classroom.findOne({ shortId: classroomId });
    if (!classroom) {
      return res
        .status(404)
        .json({ success: false, message: "Classroom not found" });
    }

    // Check if the user is part of the classroom (either as a teacher or student)
    const isTeacher = classroom.teachers.includes(userId);
    const isStudent = classroom.enrolledStudents.includes(userId);
    if (!isTeacher && !isStudent) {
      return res.status(403).json({
        success: false,
        message: "Access denied: You are not part of this classroom",
      });
    }

    // Send a success response with the classroom details
    return res.status(200).json({
      success: true,
      message: "Classroom fetched successfully",
      classroom,
    });
  } catch (error) {
    console.error("Error fetching classroom:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the classroom",
    });
  }
};

const handleAnnouncement = async (req, res) => {
  try {
    // Get the token from cookies
    const token = req.cookies.authToken;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access: Please log in" });
    }

    // Decode the token to verify the user
    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JSON_SECRET_KEY);
      userId = decoded.id; // Assuming the token contains the user ID directly
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: Invalid token" });
    }

    // Get the classroom ID from the request parameters
    const classroomId = req.params.id;
    if (!classroomId) {
      return res
        .status(400)
        .json({ success: false, message: "Classroom ID is required" });
    }

    // Find the classroom by its shortId
    const classroom = await Classroom.findOne({ shortId: classroomId });
    if (!classroom) {
      return res
        .status(404)
        .json({ success: false, message: "Classroom not found" });
    }

    // Check if the user is a teacher in the classroom
    const isTeacher = classroom.teachers.includes(userId);
    if (!isTeacher) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Access denied: Only teachers can create announcements",
        });
    }

    // Validate the incoming data
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ success: false, message: "Title and content are required" });
    }

    // Create and save the announcement to the database
    const announcement = await Announcement.create({
      title,
      content,
      createdBy: userId,
      classroomId: classroom._id, // Associate the announcement with the classroom
    });

    // Push the announcement ID to the classroom's announcements array
    classroom.announcements.push(announcement._id);
    await classroom.save();

    // Send a success response
    return res.status(201).json({
      success: true,
      message: "Announcement created successfully",
      announcement,
    });
  } catch (error) {
    console.error("Error creating announcement:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the announcement",
    });
  }
};

export {
  handleCreateClassroom,
  handleGetClassroom,
  handleJoinClassroom,
  handleGetAllClassrooms,
  handleAnnouncement,
};
