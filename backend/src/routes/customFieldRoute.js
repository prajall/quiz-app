import express from "express";
import {
  addCustomField,
  getCustomField,
} from "../controllers/customFieldController.js";

const router = express.Router();

router.post("/", addCustomField);
router.get("/:cf_id", getCustomField);

export default router;
