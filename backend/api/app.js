import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "../src/routes/userRoute.js";
import questionRoute from "../src/routes/questionRoute.js";
import scoreRoute from "../src/routes/scoreRoute.js";
import leaderboardRoute from "../src/routes/leaderboardRoute.js";
import { apiKeyValidation } from "../src/middlewares/apiKeyMiddleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
console.log(process.env.CORS_ORIGIN);

app.use(
  cors({
    origin: "https://quiz-frontend-work.vercel.app",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

// SETUP ROUTES
app.use("/user", userRoute);
app.use("/question", questionRoute);
app.use("/score", scoreRoute);
app.use("/leaderboard", apiKeyValidation, leaderboardRoute);

app.get("/", (req, res) => {
  res.send("Server is working");
});

export default app;
