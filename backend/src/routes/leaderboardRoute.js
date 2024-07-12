import express from "express";
import {
  getExamLeaderboard,
  getOverallLeaderboard,
  getUserOverallRanking,
  getUserExamRanking,
} from "../controllers/leaderboardController.js";

const router = express.Router();

router.get("/", getOverallLeaderboard);
router.get("/exam/:exam_id", getExamLeaderboard);
router.get("/user/:userId", getUserOverallRanking);
router.get("/user/:userId/exam/:exam_id", getUserExamRanking);

export default router;
