import express from "express";
import {
  getCookies,
  loginUser,
  signupUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/getcookie", getCookies);

export default router;
