import express from "express";
import {
  emailChecker,
  getCookies,
  getUserInfo,
  loginUser,
  logoutUser,
  registerOTP,
  signupUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/signup", signupUser);
router.post("/checkemail", emailChecker);
router.get("/getcookie", getCookies);
router.get("/getuser", getUserInfo);
router.post("/register-otp", registerOTP);
router.get("/", (req, res) => res.send("User Route"));

export default router;
