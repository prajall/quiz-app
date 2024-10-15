import express from "express";
import {
  getExamLeaderboard,
  getOverallLeaderboard,
  getUserOverallRanking,
  getUserExamRanking,
  getAllExamLeaderboards,
} from "../controllers/discarded_leaderboardController.js";

const router = express.Router();

router.get("/", getOverallLeaderboard);
router.get("/exam/:exam_id", getExamLeaderboard);
router.get("/allexams", getAllExamLeaderboards);
router.get("/user", getUserOverallRanking);
router.get("/user/exam/:exam_id", getUserExamRanking);

export default router;
