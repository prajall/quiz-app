import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";
import { questionSchema } from "./models/questionModel.js";
import { scoreSchema } from "./models/scoreModel.js";
import { userSchema } from "./models/userModel.js";

dotenv.config();

app.listen(process.env.PORT, async () => {
  console.log("Server is running on port", process.env.PORT);
});

// connect to database
const questionDB = mongoose.createConnection(
  "mongodb+srv://mailgyannexus:08u37GXx3KMZvqFw@quiz.ajqftit.mongodb.net/?retryWrites=true&w=majority&appName=QUIZ"
);
questionDB.on("connected", () => {
  console.log("Database1 Connected Successfully");
});

const quizDB = mongoose.createConnection(
  "mongodb+srv://prajalmhrzn:prajal123@cluster0.fsgb03y.mongodb.net/quiz?retryWrites=true&w=majority&appName=Cluster0"
);

quizDB.on("connected", () => {
  console.log("Database2 Connected Successfully");
});

quizDB.on("error", (error) => {
  console.log("Database2 Connection Error: ", error);
});

//assign each model to databases
export const Question = questionDB.model("Questions", questionSchema);
export const Score = quizDB.model("Score", scoreSchema);
export const User = quizDB.model("Users", userSchema);
