import express from "express";
import multer from "multer";
import File from "../models/files.js";

const fileRouter = new express.Router();
const upload = multer({ storage: multer.memoryStorage() });

fileRouter.get("/allFiles/:streamID", async (req, res) => {
  try {
    const streamId = req.params.streamID;

    if (!streamId) {
      return res
        .status(400)
        .json({ message: "streamId parameter is required" });
    }

    const files = await File.find({ streamId });

    if (!files || files.length === 0) {
      return res
        .status(404)
        .json({ message: "No files found for this streamId" });
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

fileRouter.get("/getFile/:fileID", async (req, res) => {
  try {
    const fileId = req.params.fileID;
    const file = await File.findOne({ _id: fileId });
    res.set("Content-Type", file.contentType);
    res.set("Content-Disposition", `attachment; filename="${file.filename}"`);
    res.send(file.fileData);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

fileRouter.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { classId, createdBy } = req.body;
    const file = new File({
      filename: req.file.originalname,
      fileData: req.file.buffer,
      contentType: req.file.mimetype,
      classId,
      createdBy,
    });

    await file.save();

    res
      .status(201)
      .json({ message: "File uploaded and saved to MongoDB", file });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default fileRouter;
