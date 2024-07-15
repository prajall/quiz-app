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
    origin: "*",
    methods: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// SETUP ROUTES
app.use("/user", userRoute);
app.use("/question", questionRoute);
app.use("/score", apiKeyValidation, scoreRoute);
app.use("/leaderboard", apiKeyValidation, leaderboardRoute);
