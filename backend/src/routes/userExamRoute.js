import express from "express";
import { addUserExamData } from "../controllers/userExamController.js";
import { etutorUserAuth } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/", etutorUserAuth, addUserExamData);

export default router;
