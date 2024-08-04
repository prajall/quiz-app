import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "../src/routes/userRoute.js";
import questionRoute from "../src/routes/questionRoute.js";
import scoreRoute from "../src/routes/scoreRoute.js";
import leaderboardRoute from "../src/routes/leaderboardRoute.js";
import { apiKeyValidation } from "../src/middlewares/apiKeyMiddleware.js";

const app = express();

console.log(process.env.CORS_ORIGIN);
app.use(
  cors({
    origin: "https://quiz-app-frontend-dbh62ezu3-prajalls-projects.vercel.app",
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
  res.send("Server is working");
});

export default app;
