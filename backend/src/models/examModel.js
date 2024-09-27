import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  exam_id: {
    type: String,
    required: true,
    unique: true,
  },
  totalQuestions: {
    type: Number,
    default: 0,
  },
  totalLevels: {
    type: Number,
    default: 0,
  },
  name: {
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
});

export const Exam = mongoose.model("Exam", examSchema);
