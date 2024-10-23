import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "../src/routes/userRoute.js";
import questionRoute from "../src/routes/questionRoute.js";
import scoreRoute from "../src/routes/scoreRoute.js";
import leaderboardRoute from "../src/routes/leaderboardRoute.js";
import examRoute from "../src/routes/examRoute.js";
import gameDataRoute from "../src/routes/gameDataRoute.js";
import userExamRoute from "../src/routes/userExamRoute.js";
import examSoldRoute from "../src/routes/examsoldRoute.js";
import customFieldRoute from "../src/routes/customFieldRoute.js";

const app = express();

app.use(
  cors({
    origin: [
      "https://etutorquiz.vercel.app",
      "http://localhost:3000",
      "https://exams.etutorclass.com",
    ],
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
  })
);
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://exams.etutorclass.com");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, x-api-key"
//   );
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// SETUP ROUTES
// app.use("/api/v1");
app.use("/api/v1/user", userRoute);
app.use("/api/v1/question", questionRoute);
app.use("/api/v1/score", scoreRoute);
app.use("/api/v1/gamedata", gameDataRoute);
app.use("/api/v1/leaderboard", leaderboardRoute);
app.use("/api/v1/exam", examRoute);
app.use("/api/v1/userexam", userExamRoute);
app.use("/api/v1/examsold", examSoldRoute);
app.use("/api/v1/custom-field", customFieldRoute);
// app.use("/examsold", examSoldRoute);

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.post("/api/v1", (req, res) => {
  console.log("Cookies:", req.cookies);
  const cookies = req.cookies;

  // console.log("Request:", req);
  res.send("Check cookies");
});

export default app;
