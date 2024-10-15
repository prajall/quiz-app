import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    etutor_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    phoneNumber: {
      type: String,
      lowercase: true,
      index: true,
    },
    coins: {
      type: Number,
      default: 150,
      required: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
      required: true,
    },
    totalScore: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);
