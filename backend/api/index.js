import dotenv from "dotenv";
import mongoose from "mongoose";
import { questionSchema } from "../src/models/questionModel.js";
import { scoreSchema } from "../src/models/scoreModel.js";
import { userSchema } from "../src/models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import app from "./app.js";
import { examSoldSchema } from "../src/models/examSoldModel.js";
import { examSchema } from "../src/models/examModel.js";
import { gameDataSchema } from "../src/models/gameDataModel.js";
import { userExamSchema } from "../src/models/userExamModel.js";
import { customFieldsSchema } from "../src/models/customFieldModel.js";

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("API/api Server is running on port", port);
});

let questionDB;
let quizDB;
try {
  questionDB = mongoose.createConnection(process.env.DATABASE1_URI);
  questionDB.on("connected", () => {
    console.log("Database1 Connected Successfully");
  });

  quizDB = mongoose.createConnection(process.env.DATABASE2_URI);

  quizDB.on("connected", () => {
    console.log("Database2 Connected Successfully");
  });

  quizDB.on("error", (error) => {
    console.log("Database2 Connection Error: ", error);
  });
} catch (err) {
  console.log(err);
}

// Assign each model to databases
export const Question = questionDB.model("Question", questionSchema);
export const Score = quizDB.model("Score", scoreSchema);
export const User = quizDB.model("User", userSchema);
export const Exam = quizDB.model("Exams", examSchema);
export const ExamSold = quizDB.model("ExamSolds", examSoldSchema);
export const GameData = quizDB.model("GameDatas", gameDataSchema);
export const UserExam = quizDB.model("UserExams", userExamSchema);
export const CustomField = quizDB.model("CustomFields", customFieldsSchema);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default app;
