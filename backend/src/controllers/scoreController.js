// import { Score } from "../models/scoreModel.js";
import { Score, User } from "../../api/index.js";

export const updateScore = async (req, res) => {
  // const { userId } = req.params;
  const userData = req.userData;
  const userId = userData.id;

  try {
    const { score } = req.body;

    if (!score || !userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const initialScores = await Score.findOne({ user: userId });

    if (!initialScores) {
      return res.status(404).json({ error: "Score not found" });
    }

    Object.keys(score).forEach((key) => {
      if (initialScores[key] !== undefined) {
        initialScores[key] += score[key];
      }
    });

    await initialScores.save();
    const finalScore = await Score.findOne({ user: userId });

    res.status(200).send(finalScore);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserScore = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).send("User Id is required");
  }

  try {
    const userScore = await Score.findOne({ userId });

    if (!userScore) {
      res.status(404).send("Failed to fetch User's score");
    }

    res.status(200).send(userScore);
  } catch (err) {
    console.log("Error gettingScore", err);
    res.status(500).send("Internal Server Error");
  }
};
