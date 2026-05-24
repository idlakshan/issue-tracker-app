import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: {
    type: String,
    enum: ["CREATE", "STATUS_CHANGE", "ASSIGN", "RESOLVE"],
    required: true,
  },
  issue: { type: mongoose.Schema.Types.ObjectId, ref: "Issue", required: true },
  metaData: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
});

export const Activity = mongoose.model("Activity", ActivitySchema);
