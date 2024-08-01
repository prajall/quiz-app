import bcrypt from "bcrypt";
import multer from "multer";
import jwt, { decode } from "jsonwebtoken";
import { User, Score } from "../index.js";
import { uploadOnCloudinary } from "../cloudinary.js";

// generate jwt token
const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET);
  return token;
};
const verifyToken = (token) => {
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    return verified; // Return the decoded data
  } catch (err) {
    console.log("Invalid Token");
    return false;
  }
};

const storage = multer.memoryStorage();
const upload = multer({ storage });

//signup new user
const signupUser = async (req, res) => {
  upload.single("profilePicture")(req, res, async (err) => {
    if (err) {
      return res.status(400).send("Error uploading file");
    }

    const { email, password, name, interests } = req.body;

    try {
      if (!email || !password || !name) {
        return res.status(400).send("All fields are required");
      }

      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(409).send("Email already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      let imageUrl =
        "http://res.cloudinary.com/dwjhsf65j/image/upload/v1722151225/profile_pictures/lvak9mh0vrp4kgr6loca.jpg";
      if (req.file) {
        const cloudinaryResult = await uploadOnCloudinary(
          req.file.buffer,
          "profile_pictures"
        );
        console.log(cloudinaryResult);
        imageUrl = cloudinaryResult.url;
      }

      const createdUser = await User.create({
        email,
        password: hashedPassword,
        name,
        image: imageUrl,
        interests: interests,
      });
      console.log(createdUser);

      const userWithoutPassword = createdUser.toObject();
      delete userWithoutPassword.password;

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

      if (createdUser) {
        const token = generateToken(createdUser._id);

        res.cookie(" token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          expires: new Date(Date.now() + 2592000000),
        });
      }

      return res.status(200).send(userWithoutPassword);
    } catch (err) {
      console.log("Signup User error: ", err);
      return res.status(500).send("Internal Server Error");
    }
  });
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
    sameSite: "None",
  });
  return res.status(200).json(loggedInUser);
};

//check if user exist
export const emailChecker = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Email and Password are required");
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(409).send("Email already exists");
  }
  res.send("continue").status(200);
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
    });
    res.status(200).send("Logged out Successfully");
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Logout failed" });
  }
};

export const getCookies = async (req, res) => {
  const cookie = req.cookies;
  console.log(cookie);
  res.status(200).send(cookie);
};

export const getUserInfo = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Please Login");
  }

  try {
    const decodedData = verifyToken(token);
    if (!decodedData) {
      return res.status(404).send("Invalid Token");
    }
    const user = await User.findById(decodedData.id).select(
      "-password -interests -createdAt -updatedAt"
    );
    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.status(200).send(user);
  } catch (err) {
    console.error("Error fetching user info: ", err);
    return res.status(400).send(err.message);
  }
};

export { loginUser, signupUser };
