import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import questionRoute from "./routes/questionRoute.js";
import scoreRoute from "./routes/scoreRoute.js";
import leaderboardRoute from "./routes/leaderboardRoute.js";
import examRoute from "./routes/examRoute.js";
import gameRoute from "./routes/gameDataRoute.js";
import { apiKeyValidation } from "./middlewares/apiKeyMiddleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "https://quiz-frontend-work.vercel.app",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
  })
);

// SETUP ROUTES
app.use("/user", userRoute);
app.use("/question", questionRoute);
app.use("/score", scoreRoute);
app.use("/game", gameRoute);
app.use("/leaderboard", apiKeyValidation, leaderboardRoute);
app.use("/exams", examRoute);

app.get("/", (req, res) => {
  res.send("Server is working");
});

export default app;
