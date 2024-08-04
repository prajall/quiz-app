import express from "express";
import {
  getExamQuestions,
  getQuestionById,
  getRandomQuestions,
} from "../controllers/questionController.js";

const router = express.Router();

router.get("/exam/:exam_id", getExamQuestions);
router.get("/random", getRandomQuestions);
router.get("/:questionId", getQuestionById);
router.get("/", (req, res) => res.send("Question Route"));

export default router;
