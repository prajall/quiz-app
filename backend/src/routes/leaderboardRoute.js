import express from "express";
import {
  getExamLeaderboard,
  getOverallLeaderboard,
} from "../controllers/leaderboardController.js";

const router = express.Router();

router.get("/", getOverallLeaderboard);
router.get("/exam/:exam_id", getExamLeaderboard);

export default router;
