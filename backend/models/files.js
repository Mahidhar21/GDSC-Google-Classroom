import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  fileData: { type: Buffer, required: true },
  contentType: { type: String, required: true },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classroom",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  uploadTime: { type: Date, default: Date.now },
  streamId: { type: String, required: true, default: "None" },
});

const Files = mongoose.models.Files || mongoose.model("Files", fileSchema);
export default Files;
