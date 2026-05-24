import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: { type: String, required: true },
  initials: { type: String, required: true, uppercase: true },
  refreshToken: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", UserSchema);
