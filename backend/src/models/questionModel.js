import mongoose from "mongoose";

export const questionSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  exam: {
    type: mongoose.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  exam_id: {
    type: String,
    required: true,
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
