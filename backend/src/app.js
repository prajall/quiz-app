import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import questionRoute from "./routes/questionRoute.js";
import scoreRoute from "./routes/scoreRoute.js";
import leaderboardRoute from "./routes/leaderboardRoute.js";
import { apiKeyValidation } from "./middlewares/apiKeyMiddleware.js";

const app = express();

export default app;

app.use(
  cors({
    // origin: process.env.CORS_ORIGIN,
    origin: [
      "http://localhost:3000",
      "https://quiz-app-frontend-six-tawny.vercel.app",
    ],
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
app.use("/", (req, res) => {
  res.send("Server is working");
});
