//user's exam data
import mongoose from "mongoose";

export const userExamSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    exam: {
      type: mongoose.Types.ObjectId,
      ref: "Exam",
      required: true,
      index: true,
    },
    totalAttempts: {
      type: Number,
      required: true,
      default: 0,
    },
    highestCorrect: {
      type: Number,
      required: true,
      default: 0,
    },
    levelsUnlocked: {
      type: Number,
      required: true,
      default: 1,
    },
    score: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);
