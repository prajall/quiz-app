import express from "express";
import {
  addCoins,
  emailChecker,
  etutorLogin,
  getCookies,
  getUserInfo,
  loginUser,
  logoutUser,
  makeUserPremium,
  registerVerificationCode,
  resetPassword,
  signupUser,
  verifyCode,
} from "../controllers/userController.js";
import { etutorUserAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", (req, res) => res.send("User Route"));

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/signup", signupUser);
router.post("/checkemail", emailChecker);
router.get("/getcookie", getCookies);
router.post("/register-code", registerVerificationCode);
router.post("/verify-code", verifyCode);
router.post("/reset-password", resetPassword);

router.post("/etutor-login", etutorLogin);
router.get("/info", etutorUserAuth, getUserInfo);
router.patch("/make-premium", etutorUserAuth, makeUserPremium);
router.post("/add-coins", etutorUserAuth, addCoins);

export default router;
