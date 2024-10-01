import express from "express";
import {
  addQuestion,
  changeQuestionFormat,
  getExamQuestions,
  getQuestionById,
  getRandomQuestions,
  updateQuestion,
} from "../controllers/questionController.js";
import { etutorUserAuth } from "../middlewares/authMiddleware.js";
import { coinChecker } from "../middlewares/userChecker.js";

const router = express.Router();

router.get("/exam/:examId", etutorUserAuth, coinChecker(5), getExamQuestions);
router.get("/random", getRandomQuestions);
router.get("/:questionId", getQuestionById);
router.get("/", (req, res) => res.send("Question Route"));
router.put("/change-format", changeQuestionFormat);
router.patch("/edit/:questionId", updateQuestion);
router.post("/add", addQuestion);

export default router;
