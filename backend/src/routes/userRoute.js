import express from "express";
import {
  getCookies,
  getUserInfo,
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/signup", signupUser);
router.get("/getcookie", getCookies);
router.get("/getuser", getUserInfo);

export default router;
