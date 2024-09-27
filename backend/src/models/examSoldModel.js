import mongoose from "mongoose";

export const examSoldSchema = new mongoose.Schema({
  exam_id: {
    type: Number,
    required: true,
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
    index: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
    index: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
});
