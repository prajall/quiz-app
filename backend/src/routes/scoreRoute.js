import express from "express";
import { getUserScore, updateScore } from "../controllers/scoreController.js";
import { authorisedUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// router.patch("/user/:userId", updateScore);
router.patch("/", authorisedUser, updateScore);
// router.patch("/", updateScore);
router.get("/user/:userId", getUserScore);
router.get("/", (req, res) => res.send("Score Route"));

export default router;
