import bcrypt from "bcrypt";
import multer from "multer";
import jwt, { decode } from "jsonwebtoken";
import { User, Score } from "../../api/index.js";
import { uploadOnCloudinary } from "../cloudinary.js";
import nodemailer from "nodemailer";
import logger from "../../logger.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const log = logger("userController.js");
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

//signup new user
export const signupUser = async (req, res) => {
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
        imageUrl = cloudinaryResult.url;
      }

      const createdUser = await User.create({
        email,
        password: hashedPassword,
        name,
        image: imageUrl,
        interests: interests,
      });

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

      return res.status(200).json(userWithoutPassword);
    } catch (err) {
      console.log("Signup User error: ", err);
      return res.status(500).send("Internal Server Error");
    }
  });
};

//login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
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

//logout
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
  res.status(200).send(cookie);
};

export const getUserInfo = async (req, res) => {
  const user = req.user;
  if (!user || !user._id) {
    return res.status(404).send("User Id is required");
  }

  try {
    const userDoc = await User.findById(user._id).select(
      "-createdAt -updatedAt -verificationCode"
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

export const registerVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    user.verificationCode = verificationCode;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                background-color: #f9f9f9;
                color: #333333;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #284b63;
                color: #ffffff;
                padding: 15px;
                border-radius: 8px 8px 0 0;
                text-align: center;
            }
            .content {
                padding: 15px;
                text-align: center;
                font-size: 16px;
            }
            p {
                margin-top: 20px;
                padding: 10px;
                text-align: center;
                font-size: 14px;
            }
            .verificationCode {
                font-size: 28px;
                font-weight: bold;
                color: #284b63;
                margin: 10px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Verify Email</h1>
            </div>
            <div class="content">
                <p>Please use the following code to verify your email and change password for QuizPro. <br/>
                If you did not request this, please ignore this email
                <p class="verificationCode">${verificationCode}</p>
                </p>
            </div>
        </div>
    </body>
    </html>
  `;

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "Email Verification",
      html: htmlContent,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).send("Failed to send email");
      } else {
        console.log("Email sent:", info.response);
        return res.status(200).send("Email sent successfully");
      }
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const verifyCode = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    if (!email || !verificationCode) {
      return res.status(400).send("Email and verificationCode are required.");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    if (user.verificationCode !== verificationCode) {
      return res.status(400).send("Invalid Verification Code.");
    }

    user.verificationCode == "";
    user.save();
    res.status(200).send("Code verified successfully.");
    return;
  } catch (error) {
    console.error("Error verifying Code:", error);
    return res.status(500).send("Internal server error.");
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, verificationCode } = req.body;

    if (!email || !newPassword || !verificationCode) {
      return res.status(400).send("Email and New password are required.");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    if (user.verificationCode !== verificationCode) {
      return res.status(400).send("Invalid Verification Code.");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    user.verificationCode = null;
    await user.save();

    return res.status(200).send("Password reset successfully.");
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).send("Internal server error.");
  }
};

export const etutorLogin = async (req, res) => {
  const { etutor_id } = req.headers;
  if (!etutor_id) {
    return res.status(400).json({ message: "Etutor Id is required" });
  }

  const user = await User.findOne({ etutor_id }).select(
    "-createdAt -updatedAt -verificationCode"
  );
  try {
    if (user) {
      return res.status(200).json({ message: "User Exists", data: user });
    } else {
      const newUser = new User({
        etutor_id,
      });
      if (newUser) {
        await newUser.save();
        res.status(201).json({ message: "New User Created", data: newUser });
      } else {
        return res.status(500).send("Failed to create user.");
      }
    }
  } catch (error) {
    log.error("Error in etutorLogin controller");
    return res.status(500).send("Internal server error");
  }
};

export const makeUserPremium = async (req, res) => {
  try {
    //TODO:  This should be done by admin

    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.isPremium) {
      return res.status(200).json({ message: "User is already premium" });
    }
    user.isPremium = true;
    await user.save();
    return res.status(200).json({ message: "User is now premium" });
  } catch (error) {
    log.error("Error in makeUserPremium", JSON.stringify(error));
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const makeUserNonPremium = async (req, res) => {
  try {
    //TODO:  This should be done by admin

    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.isPremium) {
      return res.status(200).json({ message: "User is already Non-Premium" });
    }
    user.isPremium = false;
    await user.save();
    return res.status(200).json({ message: "User is now Non-Premium" });
  } catch (error) {
    log.error("Error in makeUserPremium", JSON.stringify(error));
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCoins = async (req, res) => {
  try {
    const user = req.user;
    const { coins, subtract } = req.body;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!coins) {
      return res.status(404).json({ message: "Coins not found" });
    }

    if (typeof coins !== "number" || coins < 0) {
      return res
        .status(404)
        .json({ message: "Coins must be a positive number" });
    }
    if (subtract) {
      user.coins -= coins;
    } else {
      user.coins += coins;
    }
    if (user.coins < 0) {
      user.coins = 0;
    }
    await user.save();
    return res.status(200).json({ message: "Coins updated successfully" });
  } catch (error) {
    log.error("Error in addCoins", JSON.stringify(error));
    return res.status(500).json({ message: "Internal server error" });
  }
};
