import { User } from "../../api/index.js";
import { Exam } from "../../api/index.js";
import { GameData } from "../../api/index.js";
import mongoose from "mongoose";

export const addGameData = async (req, res) => {
  console.log("Adding Game Data");
  try {
    const {
      level,
      user,
      exam,
      totalSolved,
      totalCorrect,
      playedTime,
      timerSet,
      submittedTime,
      gameMode,
      playedFrom,
      location,
    } = req.body;

    if (
      !level ||
      !user ||
      !exam ||
      totalSolved == null ||
      totalCorrect == null ||
      !timerSet ||
      !submittedTime ||
      !playedFrom ||
      !gameMode
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided and valid." });
    }

    const userExists = await User.findById(user);
    if (!userExists) {
      return res.status(404).json({ message: "User not found." });
    }

    const examExists = await Exam.findById(exam);
    if (!examExists) {
      return res.status(400).json({ message: "Exam not found." });
    }

    if (level < 0 || totalSolved < 0 || totalCorrect < 0 || timerSet < 0) {
      return res
        .status(400)
        .json({ message: "Numeric values must be positive." });
    }

    if (totalCorrect > totalSolved) {
      return res
        .status(400)
        .json({ message: "totalCorrect cannot be greater than totalSolved." });
    }

    if (submittedTime > timerSet) {
      return res.status(400).json({
        message: "submittedTime exceeds the timer set for the round.",
      });
    }

    if (!["normal", "descriptive"].includes(gameMode)) {
      return res.status(400).json({ message: "Invalid gameMode value." });
    }

    if (playedFrom && !["app", "web"].includes(playedFrom)) {
      return res.status(400).json({ message: "Invalid playedFrom value." });
    }

    const newGame = new GameData({
      level,
      user,
      exam,
      totalSolved,
      totalCorrect,
      playedTime,
      timerSet,
      submittedTime,
      gameMode,
      playedFrom,
      location,
    });

    const savedGame = await newGame.save();

    res.status(201).json(savedGame);
  } catch (error) {
    console.error("Error saving gamePlayed document:", error);
    res.status(500).json({ message: "Failed to save game data" });
  }
};

export const getLevels = async (req, res) => {
  try {
    const { userId } = req.params;
    const { examId } = req.query;

    // Ensure the user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const totalLevels = exam.totalLevels;

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const examObjectId = new mongoose.Types.ObjectId(examId);

    const levelsData = await GameData.aggregate([
      { $match: { user: userObjectId, exam: examObjectId } },
      {
        $group: {
          _id: "$level",
          totalSolved: { $first: "$totalSolved" },
          totalCorrect: { $first: "$totalCorrect" },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          _id: 0,
          level: "$_id",
          totalSolved: 1,
          totalCorrect: 1,
        },
      },
    ]);

    console.log("levelsData:", levelsData);

    // Initialize an array with totalLevels and default values
    const levelsArray = Array.from({ length: totalLevels }, (_, index) => ({
      level: index + 1,
      unlocked: false,
      totalSolved: 0,
      totalCorrect: 0,
    }));

    // Update levelsArray with data from levelsData
    levelsData.forEach((levelData) => {
      const levelIndex = levelData.level - 1;
      if (levelsArray[levelIndex]) {
        levelsArray[levelIndex] = {
          ...levelsArray[levelIndex],
          ...levelData,
          unlocked: true,
        };
      }
    });

    res.status(200).json(levelsArray);
  } catch (error) {
    console.error("Error fetching level data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
