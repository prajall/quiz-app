import mongoose from "mongoose";
import { Exam, UserExam } from "../../api/index.js";

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
    console.error("Error adding user exam data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
