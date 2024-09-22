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
    { name: "questionImage", maxCount: 1 },
    { name: "opt_AImage", maxCount: 1 },
    { name: "opt_BImage", maxCount: 1 },
    { name: "opt_CImage", maxCount: 1 },
    { name: "opt_DImage", maxCount: 1 },
  ]),
  addQuestion
);
router.put(
  "/update/:questionId",
  upload.fields([
    { name: "questionImage", maxCount: 1 },
    { name: "opt_AImage", maxCount: 1 },
    { name: "opt_BImage", maxCount: 1 },
    { name: "opt_CImage", maxCount: 1 },
    { name: "opt_DImage", maxCount: 1 },
  ]),
  updateQuestion
);
export default router;
