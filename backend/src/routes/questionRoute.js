import express from "express";
import {
  addQuestion,
  changeQuestionFormat,
  getExamQuestions,
  getQuestionById,
  getRandomQuestions,
  updateQuestion,
} from "../controllers/questionController.js";

const router = express.Router();

router.get("/exam/:examId", getExamQuestions);
router.get("/random", getRandomQuestions);
router.get("/:questionId", getQuestionById);
router.get("/", (req, res) => res.send("Question Route"));
router.put("/change-format", changeQuestionFormat);
router.patch("/edit/:questionId", updateQuestion);
router.post("/add", addQuestion);

export default router;
