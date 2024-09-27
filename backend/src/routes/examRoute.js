import express from "express";
import {
  addExam,
  deleteExam,
  editExam,
  getAllExams,
} from "../controllers/examController.js";

const router = express.Router();

router.get("/", getAllExams);
router.post("/", addExam);
router.delete("/:exam_id", deleteExam);
router.patch("/:exam_id", editExam);

export default router;
