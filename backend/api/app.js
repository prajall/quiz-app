import express from "express";

const app = express();

export default app;

// app.use(
//   cors({
//     // origin: process.env.CORS_ORIGIN,
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PATCH", "DELETE"],
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use(cookieParser());

// // SETUP ROUTES
// app.use("/user", userRoute);
// app.use("/question", questionRoute);
// app.use("/score", scoreRoute);
// app.use("/leaderboard", apiKeyValidation, leaderboardRoute);
