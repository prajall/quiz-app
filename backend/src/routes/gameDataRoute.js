import express from "express";
import { addGameData, getLevels } from "../controllers/gameDataController.js";

const router = express.Router();

router.post("/add", addGameData);
router.get("/levels/:userId", getLevels);

export default router;
