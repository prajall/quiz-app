import express from "express";
import {
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

router.post("/etutor-login", etutorLogin);
router.patch("/make-premium", etutorUserAuth, makeUserPremium);

export default router;
