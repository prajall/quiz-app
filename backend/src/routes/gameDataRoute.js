import express from "express";
import { addGameData, getLevels } from "../controllers/gameDataController.js";
import { etutorUserAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", etutorUserAuth, addGameData);
router.get("/levels", etutorUserAuth, getLevels);

export default router;
