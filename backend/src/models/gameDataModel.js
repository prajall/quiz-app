import mongoose, { Schema } from "mongoose";

export const gameDataSchema = new Schema({
  level: {
    type: Number,
    required: true,
    index: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  exam: {
    type: Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
    index: true,
  },
  totalSolved: {
    type: Number,
    required: true,
  },
  totalCorrect: {
    type: Number,
    required: true,
  },
  playedTime: {
    //when user started the round
    type: Date,
    default: Date.now,
    required: true,
  },
  timerSet: {
    //timer that user set for that round
    type: Number,
    required: true,
  },
  submittedTime: {
    //when user ended the round (from timerSet)
    type: Number,
    required: true,
  },
  gameMode: {
    type: String,
    enum: ["normal", "descriptive"],
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  accuracy: {
    type: Number,
  },
  playedFrom: {
    type: String,
    enum: ["app", "web"],
  },
  location: {
    type: String,
  },
});
