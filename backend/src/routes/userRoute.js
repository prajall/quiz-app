import express from "express";
import {
  emailChecker,
  etutorLogin,
  getCookies,
  getUserInfo,
  loginUser,
  logoutUser,
  makeUserNonPremium,
  makeUserPremium,
  registerVerificationCode,
  resetPassword,
  signupUser,
  updateCoins,
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

router.get("/exam-auth", etutorLogin);
router.get("/info", etutorUserAuth, getUserInfo);
router.patch("/make-premium", etutorUserAuth, makeUserPremium);
router.patch("/make-non-premium", etutorUserAuth, makeUserNonPremium);
router.patch("/update-coins", etutorUserAuth, updateCoins);

router.post("/auth", (req, res) => {
  const cookies = req.cookies;
  console.log("Cookies: ", cookies);
  res.json({
    success: true,
    message: "Auth Cookie Validated Successfully",
    data: {
      id: 96712,
      name: "Roshan Bhusal",
      email: "bhusalroshan2058@gmail.com",
      contact: "9843223774",
    },
    cookies,
  });
});

export default router;
