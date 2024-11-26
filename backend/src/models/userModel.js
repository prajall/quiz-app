import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    etutor_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      lowercase: true,
      index: true,
    },
    image: {
      type: String,
    },
    coins: {
      type: Number,
      default: 1000,
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
