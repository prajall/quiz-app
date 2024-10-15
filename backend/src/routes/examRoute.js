import express from "express";
import {
  addExam,
  deleteExam,
  editExam,
  getAllExams,
  getExamDetails,
  getUsersExams,
} from "../controllers/examController.js";
import { etutorUserAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", etutorUserAuth, getUsersExams);
router.get("/admin", getAllExams);
router.post("/", addExam);
router.delete("/:exam_id", deleteExam);
router.patch("/:exam_id", editExam);
router.get("/:examId", getExamDetails);

export default router;
