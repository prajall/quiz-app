import { User } from "../models/userModel.js";
import { Exam } from "../models/examModel.js";
import { GameData } from "../models/gameDataModel.js";

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

    const newGame = new GamePlayed({
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
