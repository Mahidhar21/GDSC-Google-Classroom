import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdBy: { type: String, required: true }, // Teacher ID
    classroomId: { type: mongoose.Schema.Types.ObjectId, ref: "Classroom", required: true }, // Reference to the Classroom
  },
  { timestamps: true }
);

const Announcement =
  mongoose.models.Announcement || mongoose.model("Announcement", announcementSchema);

export default Announcement;