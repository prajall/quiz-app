import express from "express";
import { addGameData } from "../controllers/gameDataController";

const router = express.Router();

router.post("/add", addGameData);

export default router;
