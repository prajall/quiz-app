import express from "express";
import {
  emailChecker,
  getCookies,
  getUserInfo,
  loginUser,
  logoutUser,
  registerOTP,
  resetPassword,
  signupUser,
  verifyOTP,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/signup", signupUser);
router.post("/checkemail", emailChecker);
router.get("/getcookie", getCookies);
router.get("/getuser", getUserInfo);
router.post("/register-otp", registerOTP);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.get("/", (req, res) => res.send("User Route"));

export default router;
