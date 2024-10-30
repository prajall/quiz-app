import { User, UserExam } from "../../api/index.js";
import { Exam } from "../../api/index.js";
import { GameData } from "../../api/index.js";
import mongoose from "mongoose";
import logger from "../../logger.js";

const log = logger("gameDataController.js");

export const addGameData = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const userId = user._id;

  try {
    const {
      level,
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
    console.log("Body: ", req.body);
    if (
      !level ||
      typeof level != "number" ||
      level < 0 ||
      !userId ||
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

    const userDoc = await User.findById(userId);
    if (!userDoc) {
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
        message: "submittedTime cannot exceed timerSet for the round.",
      });
    }

    if (!["normal", "descriptive"].includes(gameMode)) {
      return res
        .status(400)
        .json({ message: "gameMode must be 'normal' or 'descriptive' " });
    }

    if (playedFrom && !["app", "web"].includes(playedFrom)) {
      return res
        .status(400)
        .json({ message: "playedFrom must be 'app' or 'web" });
    }

    const calculateScore = (totalCorrect, totalSolved, level) => {
      console.log("totalCorrect: ", totalCorrect);
      console.log("totalSolved: ", totalSolved);
      console.log("level: ", level);
      const levelMultiplier = 1 + level * 0.0015;
      return Math.round((totalCorrect + totalSolved * 0.01) * levelMultiplier);
    };

    const score = calculateScore(totalCorrect, totalSolved, level);
    console.log("Score: ", score);

    let accuracy = 0;
    if (totalSolved > 0) {
      accuracy = (totalCorrect / totalSolved) * 100;
    }
    console.log("Accuracy: ", accuracy);

    const newGame = new GameData({
      level,
      user: userId,
      exam,
      totalSolved,
      totalCorrect,
      playedTime,
      timerSet,
      submittedTime,
      gameMode,
      playedFrom,
      location,
      accuracy,
      score,
    });

    // Update the user's exam performance in UserExamData
    const userExamDoc = await UserExam.findOne({
      user: userId,
      exam: exam,
    });

    if (userExamDoc) {
      if (totalCorrect > userExamDoc.highestCorrect) {
        userExamDoc.highestCorrect = totalCorrect;
      }
      userExamDoc.totalAttempts += totalSolved;
      userExamDoc.score += score;

      const updatedUserExamDoc = await userExamDoc.save({ new: true });
      console.log("Updated UserExam document:", updatedUserExamDoc);
    } else {
      const newUserExamDoc = await UserExam.create({
        user: userId,
        exam,
        totalAttempts: 1,
        highestCorrect: totalCorrect,
        score,
      });
      console.log("New UserExam created:", newUserExamDoc);
    }

    userDoc.totalScore += totalCorrect;
    await userDoc.save();

    const savedGame = await newGame.save({ new: true });
    console.log("Saved Game document:", savedGame);
    res.status(201).json(savedGame);
  } catch (error) {
    log.error("Error saving gamePlayed document:", error);
    res.status(500).json({ message: "Failed to save game data" });
  }
};

export const getLevels = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userId = user._id;
    const { examId } = req.query;
    if (!examId) {
      return res.status(404).json({ message: "Exam Id is required" });
    }
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

    const userExamData = await UserExam.findOne({
      user: userObjectId,
      exam: examObjectId,
    });

    const levelsUnlocked = userExamData ? userExamData.levelsUnlocked : 1;

    const levelsData = await GameData.aggregate([
      {
        $match: {
          user: userObjectId,
          exam: examObjectId,
        },
      },
      {
        $group: {
          _id: "$level",
          totalCorrect: { $max: "$totalCorrect" },
          doc: { $first: "$$ROOT" },
          attempts: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $project: {
          _id: 0,
          level: "$_id",
          totalSolved: "$doc.totalSolved",
          totalCorrect: "$doc.totalCorrect",
          attempts: 1,
        },
      },
    ]);

    // Initialize an array with totalLevels and default values
    const levelsArray = Array.from({ length: totalLevels }, (_, index) => ({
      level: index + 1,
      unlocked: index + 1 <= levelsUnlocked,
      totalSolved: 0,
      totalCorrect: 0,
      attempts: 0,
    }));

    if (levelsArray.length > 0) {
      levelsArray[0].unlocked = true;
    }

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
    log.error("Error fetching level data:", JSON.stringify(error));
    res.status(500).json({ message: "Internal Server Error" });
  }
};
