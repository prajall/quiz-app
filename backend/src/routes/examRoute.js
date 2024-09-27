import express from "express";
import {
  addExam,
  deleteExam,
  editExam,
  getAllExams,
} from "../controllers/examController";
import { getOverallLeaderboard } from "../controllers/leaderboardController";

const router = express.Router();

router.get("/", getOverallLeaderboard);
router.post("/", addExam);
router.delete("/:exam_id", deleteExam);
router.patch("/:exam_id", editExam);

export default router;
