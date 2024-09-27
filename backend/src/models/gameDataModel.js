import mongoose, { Schema } from "mongoose";

const gameDataSchema = new Schema({
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
    type: Date,
    required: true,
  },
  gameMode: {
    type: String,
    enum: ["normal", "descriptive"],
    required: true,
  },
  accuracy: {
    type: Number,
  },
  time_taken: {
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

export const GameData = mongoose.model("GameData", gamePlayedSchema);

gameDataSchema.pre("save", function (next) {
  console.log("pre save called");
  if (this.total_solved > 0) {
    this.accuracy = (this.total_correct / this.total_solved) * 100;
  } else {
    this.accuracy = 0;
  }
  next();
});
