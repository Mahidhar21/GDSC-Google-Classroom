import mongoose from "mongoose";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import Classroom from "../models/classroom.js";
import User from "../models/user.js";

function generateNanoId() {
  const id = nanoid(7);
  return id;
}

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
      return res
        .status(400)
        .json({
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

const handleGetClassroom = async (req, res) => {};

const handleGetClasswork = async (req, res) => {};

const handleGetClassroomPeople = async (req, res) => {};

export {
  handleCreateClassroom,
  handleGetClassroom,
  handleJoinClassroom,
  handleGetClasswork,
  handleGetClassroomPeople,
};
