import dotenv from "dotenv";
import mongoose from "mongoose";
import { questionSchema } from "../src/models/questionModel.js";
import { scoreSchema } from "../src/models/scoreModel.js";
import { userSchema } from "../src/models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import app from "./app.js";

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("API Server is running on port", port);
});

let questionDB;
let quizDB;
try {
  console.log(process.env.PORT);
  questionDB = mongoose.createConnection(
    "mongodb+srv://mailgyannexus:08u37GXx3KMZvqFw@quiz.ajqftit.mongodb.net/?retryWrites=true&w=majority&appName=QUIZ"
  );
  questionDB.on("connected", () => {
    console.log("Database1 Connected Successfully");
  });

  // quizDB = mongoose.createConnection(process.env.DATABASE2_URI);
  quizDB = mongoose.createConnection(
    "mongodb+srv://prajalmhrzn:prajal123@cluster0.fsgb03y.mongodb.net/quiz?retryWrites=true&w=majority&appName=Cluster0"
  );
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
export const Question = questionDB.model("Questions", questionSchema);
export const Score = quizDB.model("Score", scoreSchema);
export const User = quizDB.model("Users", userSchema);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default app;
