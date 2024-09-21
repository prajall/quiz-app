import express from "express";
import {
  addQuestion,
  changeQuestionFormat,
  getExamQuestions,
  getQuestionById,
  getRandomQuestions,
  updateQuestion,
} from "../controllers/questionController.js";
import { upload } from "../multer.js";

const router = express.Router();

router.get("/exam/:exam_id", getExamQuestions);
router.get("/random", getRandomQuestions);
router.get("/:questionId", getQuestionById);
router.get("/", (req, res) => res.send("Question Route"));
router.put("/change-format", changeQuestionFormat);
// router.put("/update/:id", updateQuestion);
router.post(
  "/add",
  upload.fields([
    { name: "question[image]", maxCount: 1 },
    { name: "opt_A[image]", maxCount: 1 },
    { name: "opt_B[image]", maxCount: 1 },
    { name: "opt_C[image]", maxCount: 1 },
    { name: "opt_D[image]", maxCount: 1 },
  ]),
  addQuestion
);
router.put(
  "/update/:questionId",
  upload.fields([
    { name: "question[image]", maxCount: 1 },
    { name: "opt_A[image]", maxCount: 1 },
    { name: "opt_B[image]", maxCount: 1 },
    { name: "opt_C[image]", maxCount: 1 },
    { name: "opt_D[image]", maxCount: 1 },
  ]),
  updateQuestion
);
export default router;
