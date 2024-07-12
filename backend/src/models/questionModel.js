import mongoose from "mongoose";

export const questionSchema = new mongoose.Schema({
  id: String,
  exam_id: String,
  name: String,
  opt_a: String,
  opt_b: String,
  opt_c: String,
  opt_d: String,
  opt_correct: String,
});
