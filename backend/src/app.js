import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "../src/routes/userRoute.js";
import questionRoute from "../src/routes/questionRoute.js";
import scoreRoute from "../src/routes/scoreRoute.js";
import leaderboardRoute from "../src/routes/leaderboardRoute.js";
import examRoute from "../src/routes/examRoute.js";
import gameDataRoute from "../src/routes/gameDataRoute.js";
import { apiKeyValidation } from "../src/middlewares/apiKeyMiddleware.js";
import { getBatch, getbatchMembers } from "./controllers/bookCallController.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    // origin: ["https://quiz-frontend-work.vercel.app", "http://localhost:3000"],
    origin: "http://localhost:3002",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
  })
);

// SETUP ROUTES
app.get("/batchh", (req, res) => {
  res.send("Server is working");
});
app.use("/user", userRoute);
app.use("/question", questionRoute);
app.use("/score", scoreRoute);
app.use("/leaderboard", apiKeyValidation, leaderboardRoute);
app.use("/exam", examRoute);

//Get Batch Members
app.get("/batch", getBatch);
app.get("/batch-member", getbatchMembers);

// app.use("/gamedata", gameDataRoute);

export default app;
