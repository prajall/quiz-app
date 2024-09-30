import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    etutorId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    coin: {
      type: Number,
      default: 150,
      required: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);
