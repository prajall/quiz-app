import express from "express";

import { etutorUserAuth } from "../middlewares/authMiddleware.js";
import { addExamSold } from "../controllers/examSoldController.js";

const router = express.Router();

router.post("/", etutorUserAuth, addExamSold);

export default router;
