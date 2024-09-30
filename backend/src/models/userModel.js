import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    interests: {
      type: [String],
      default: [],
    },
    coin: {
      type: Number,
      default: 0,
    },
    verificationCode: String,
  },
  { timestamps: true }
);
