import mongoose from "mongoose";

export const examSchema = new mongoose.Schema({
  exam_id: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  totalQuestions: {
    type: Number,
    default: 0,
  },
  totalLevels: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: false,
  },
  subTitle: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true,
  },
});
