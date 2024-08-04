import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { questionSchema } from "./models/questionModel.js";
import { scoreSchema } from "./models/scoreModel.js";
import { userSchema } from "./models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import questionRoute from "./routes/questionRoute.js";
import scoreRoute from "./routes/scoreRoute.js";
import leaderboardRoute from "./routes/leaderboardRoute.js";
import { apiKeyValidation } from "./middlewares/apiKeyMiddleware.js";

dotenv.config();

const app = express();

export default app;

app.listen(process.env.PORT, async () => {
  console.log("Server is running on port", process.env.PORT);
});

// connect to database
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

//assign each model to databases
export const Question = questionDB.model("Questions", questionSchema);
export const Score = quizDB.model("Score", scoreSchema);
export const User = quizDB.model("Users", userSchema);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(
  cors({
    // origin: process.env.CORS_ORIGIN,
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// SETUP ROUTES
app.use("/user", userRoute);
app.use("/question", questionRoute);
app.use("/score", scoreRoute);
app.use("/leaderboard", apiKeyValidation, leaderboardRoute);
app.get("/", (req, res) => {
  return res.send("Server is working");
});
