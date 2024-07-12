import express from "express";
import { updateScore } from "../controllers/scoreController.js";

const router = express.Router();

router.patch("/user/:userId", updateScore);

export default router;
