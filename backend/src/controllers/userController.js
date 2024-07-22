import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, Score } from "../index.js";

// generate jwt token
const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET);
  return token;
};

//signup new user

const signupUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    if (!email || !password) {
      return res.status(400).send("email and Password are required");
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).send("email already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      email,
      password: hashedPassword,
    });

    await Score.create({
      user: createdUser._id,
      1001: 0,
      1002: 0,
      1003: 0,
      1004: 0,
      1005: 0,
      1006: 0,
      1007: 0,
      1008: 0,
      1009: 0,
      1010: 0,
    });

    return res.send(createdUser).status(200);
  } catch (err) {
    console.log("Signup User error: ", err);
  }
};

//login

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return res.status(400).send("email and Password are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send("User not found");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return res.status(400).send("Incorrect Password");
  }

  const loggedInUser = await User.findOne({ email }).select("-password");

  const token = generateToken(user._id);
  console.log(token);

  res.cookie(" token", token, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 2592000000),
  });
  return res.status(200).send(loggedInUser);
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send("Token Cleared Successfully");
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Logout failed" });
  }
};

export { loginUser, signupUser };
