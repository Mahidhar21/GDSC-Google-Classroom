import express from "express";
import multer from "multer";
import File from "../models/files.js";

const fileRouter = new express.Router();

fileRouter.get("/allFiles/:classID", async (req, res) => {
  try {
    const classId = req.params.classID;

    if (!classId) {
      return res.status(400).json({ message: "classId parameter is required" });
    }

    const files = await File.find({ classId });

    if (!files || files.length === 0) {
      return res
        .status(404)
        .json({ message: "No files found for this classId" });
    }

    // Sending an array of file info for frontend to pick and download individually
    const fileList = files.map((file) => ({
      id: file._id,
      filename: file.filename,
      contentType: file.contentType,
      uploadTime: file.uploadTime,
      createdBy: file.createdBy,
    }));

    res.json({ files: fileList });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

fileRouter.post("/upload/local", async (req, res) => {
  //to upload files
});

fileRouter.post("/upload/gdrive", async (req, res) => {
  //to upload files
});

export default fileRouter;
