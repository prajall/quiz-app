import express from "express";
import {
  getExamQuestions,
  getRandomQuestions,
} from "../controllers/questionController.js";

const router = express.Router();

router.get("/exam/:exam_id", getExamQuestions);
router.get("/random", getRandomQuestions);

export default router;
