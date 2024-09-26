import mongoose from "mongoose";

export const questionSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  exam_id: {
    type: String,
    enum: [
      "1001",
      "1002",
      "1003",
      "1004",
      "1005",
      "1006",
      "1007",
      "1008",
      "1009",
      "1010",
    ],
  },
  description: {
    type: String,
  },
  question: {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    _id: false,
  },

  opt_A: {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    _id: false,
  },
  opt_B: {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    _id: false,
  },
  opt_C: {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    _id: false,
  },
  opt_D: {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    _id: false,
  },
  opt_correct: {
    type: String,
    enum: ["A", "B", "C", "D"],
    required: true,
  },
});
