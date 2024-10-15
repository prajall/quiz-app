import mongoose from "mongoose";
import { Exam, UserExam } from "../../api/index.js";
import logger from "../../logger.js";

const log = logger("userExamController.js");

export const addUserExamData = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { exam, totalAttempts, highestCorrect, levelsUnlocked, score } =
      req.body;

    if (
      !exam ||
      totalAttempts == null ||
      highestCorrect == null ||
      levelsUnlocked == null ||
      score == null
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    const examExists = await Exam.findById(exam);
    if (!examExists) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const existingUserExam = await UserExam.findOne({ user: user._id, exam });

    if (existingUserExam) {
      return res
        .status(400)
        .json({ message: "User exam data already exists for this exam" });
    }

    const newUserExam = new UserExam({
      user: user._id,
      exam: exam,
      totalAttempts,
      highestCorrect,
      levelsUnlocked,
      score,
    });

    const savedUserExam = await newUserExam.save();

    res.status(201).json(savedUserExam);
  } catch (error) {
    log.error("Error adding user exam data:", JSON.stringify(error));
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const unlockExam = async (req, res) => {
  try {
    const userId = req.user._id;

    const { examId } = req.params;

    let userExam = await UserExam.findOne({
      user: mongoose.Types.ObjectId(userId),
      exam: mongoose.Types.ObjectId(examId),
    });

    if (!userExam) {
      userExam = new UserExam({
        user: mongoose.Types.ObjectId(userId),
        exam: mongoose.Types.ObjectId(examId),
        totalAttempts: 0,
        highestCorrect: 0,
        levelsUnlocked: 1,
        score: 0,
        unlocked: true,
      });

      await userExam.save();

      return res
        .status(201)
        .json({ message: "New exam record created and unlocked", userExam });
    }

    if (userExam.unlocked) {
      return res.status(400).json({ message: "Exam is already unlocked" });
    }

    userExam.unlocked = true;
    await userExam.save();

    res.status(200).json({ message: "Exam unlocked successfully", userExam });
  } catch (error) {
    log.error("Error unlocking exam:", JSON.stringify(error));
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
