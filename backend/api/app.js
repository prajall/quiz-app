import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "../src/routes/userRoute.js";
import questionRoute from "../src/routes/questionRoute.js";
import scoreRoute from "../src/routes/scoreRoute.js";
import leaderboardRoute from "../src/routes/leaderboardRoute.js";
import examRoute from "../src/routes/examRoute.js";
import gameDataRoute from "../src/routes/gameDataRoute.js";
// import examSoldRoute from "../src/routes/examSoldRoute.js";
import { apiKeyValidation } from "../src/middlewares/apiKeyMiddleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["https://quiz-frontend-work.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
  })
);

// SETUP ROUTES
// app.use("/api/v1");
app.use("/api/v1/user", userRoute);
app.use("/api/v1/question", questionRoute);
app.use("/api/v1/score", scoreRoute);
app.use("/api/v1/gamedata", gameDataRoute);
app.use("/api/v1/leaderboard", apiKeyValidation, leaderboardRoute);
app.use("/api/v1/exam", examRoute);
// app.use("/examsold", examSoldRoute);

app.get("/", (req, res) => {
  res.send("Server is is working");
});

export default app;
