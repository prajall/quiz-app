import mongoose from "mongoose";

export const questionSchema = new mongoose.Schema({
  id: {
    type: String,
    // required: true,
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
      // required: true,
    },
    // type: {
    //   type: String,
    //   enum: ["text", "image"],
    //   required: true,
    //   default: "text",
    // },
    image: {
      type: String,
    },
    // image_public_id: {
    //   type: String,
    // },
    _id: false,
  },

  opt_A: {
    name: {
      type: String,
      // required: true,
    },
    // type: {
    //   type: String,
    //   enum: ["text", "image"],
    //   default: "text",
    //   required: true,
    // },
    image: {
      type: String,
    },
    // image_public_id: { type: String },
    _id: false,
  },
  opt_B: {
    name: {
      type: String,
      // required: true,
    },
    // type: {
    //   type: String,
    //   enum: ["text", "image"],
    //   default: "text",
    //   required: true,
    // },
    image: {
      type: String,
    },
    // image_public_id: { type: String },
    _id: false,
  },
  opt_C: {
    name: {
      type: String,
      // required: true,
    },
    // type: {
    //   type: String,
    //   enum: ["text", "image"],
    //   default: "text",
    //   required: true,
    // },
    image: {
      type: String,
    },
    // image_public_id: { type: String },
    _id: false,
  },
  opt_D: {
    name: {
      type: String,
      // required: true,
    },
    // type: {
    //   type: String,
    //   enum: ["text", "image"],
    //   default: "text",
    //   required: true,
    // },
    image: {
      type: String,
    },
    // image_public_id: { type: String },
    _id: false,
  },
  opt_correct: {
    type: String,
    enum: ["A", "B", "C", "D"],
    required: true,
  },
  opt_a: String,
  opt_b: String,
  opt_c: String,
  opt_d: String,
});
