import mongoose from "mongoose";

const examSoldSchema = new mongoose.Schema({
  exam_id: {
    type: Number,
    required: true,
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
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

examSoldSchema.index({ exam_id: 1 });
examSoldSchema.index({ user: 1 });
examSoldSchema.index({ date: 1 });

module.exports = mongoose.model("ExamSold", examSoldSchema);
