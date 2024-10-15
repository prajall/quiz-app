import mongoose from "mongoose";

export const scoreSchema = new mongoose.Schema({
  total: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  1001: {
    type: Number,
    default: 0,
  },
  1002: {
    type: Number,
    default: 0,
  },
  1003: {
    type: Number,
    default: 0,
  },
  1004: {
    type: Number,
    default: 0,
  },
  1005: {
    type: Number,
    default: 0,
  },
  1006: {
    type: Number,
    default: 0,
  },
  1007: {
    type: Number,
    default: 0,
  },
  1008: {
    type: Number,
    default: 0,
  },
  1009: {
    type: Number,
    default: 0,
  },
  1010: {
    type: Number,
    default: 0,
  },
});

// Middleware to calculate the total score before saving
scoreSchema.pre("save", function (next) {
  this.total =
    this[1001] +
    this[1002] +
    this[1003] +
    this[1004] +
    this[1005] +
    this[1006] +
    this[1007] +
    this[1008] +
    this[1009] +
    this[1010];
  next();
});
