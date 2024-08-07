import express from "express";
import {
  emailChecker,
  getCookies,
  getUserInfo,
  loginUser,
  logoutUser,
  registerVerificationCode,
  resetPassword,
  signupUser,
  verifyCode,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/signup", signupUser);
router.post("/checkemail", emailChecker);
router.get("/getcookie", getCookies);
router.get("/getuser", getUserInfo);
router.post("/register-code", registerVerificationCode);
router.post("/verify-code", verifyCode);
router.post("/reset-password", resetPassword);
router.get("/", (req, res) => res.send("User Route"));

export default router;
