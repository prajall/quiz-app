import express from "express";
import {
  getExamLeaderboard,
  getOverallLeaderboard,
  getUserOverallRanking,
  getUserExamRanking,
} from "../controllers/leaderboardController.js";
import { etutorUserAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", etutorUserAuth, getOverallLeaderboard);
router.get("/exam/:examId", etutorUserAuth, getExamLeaderboard);
router.get("/user-overall-ranking", etutorUserAuth, getUserOverallRanking);
router.get("/user-exam-ranking/:examId", etutorUserAuth, getUserExamRanking);

export default router;
