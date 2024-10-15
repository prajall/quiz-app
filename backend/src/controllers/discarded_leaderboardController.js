import { Score } from "../../api/index.js";
import jwt from "jsonwebtoken";
import logger from "../../logger.js";

export const getOverallLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Score.aggregate([
      {
        $sort: {
          total: -1,
        },
      },
      {
        $limit: 10,
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo",
      },
      {
        $project: {
          _id: 1,
          score: "$total",
          "userInfo.name": 1,
          "userInfo._id": 1,
          "userInfo.image": 1,
        },
      },
    ]);

    if (!leaderboard || leaderboard.length === 0) {
      return res.status(404).json({ message: "Leaderboard Not Found" });
    }

    res.send(leaderboard);
  } catch (err) {
    console.log("Error fetching Leaderboard: ", err);
    res.status(500).send("Internal Server Error");
  }
};

export const getUserOverallRanking = async (req, res) => {
  const token = req.cookies.token;

  try {
    // Verify the token and extract the userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    if (!userId) {
      return res.status(400).json({ message: "Missing UserId" });
    }

    // Find the user's overall score
    const userScore = await Score.findOne({
      user: userId,
    });

    if (!userScore) {
      return res.status(404).json({ message: "User score not found" });
    }

    // Count scores greater than the user's overall score
    const higherScoresCount = await Score.countDocuments({
      total: { $gt: userScore.total },
    });

    // User's rank is the count of higher scores + 1 (1-indexed)
    const userRank = higherScoresCount + 1;

    // Send both rank and score
    return res.status(200).json({
      rank: userRank,
      score: userScore.total,
      _id: userId,
    });
  } catch (err) {
    console.error("Error fetching user rank:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserExamRanking = async (req, res) => {
  const { exam_id } = req.params;
  const token = req.cookies.token;

  try {
    // Verify the token and extract the userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    if (!userId || !exam_id) {
      return res.status(400).json({ message: "Missing UserId or ExamId" });
    }

    // Find the user's exam score
    const userExamScore = await Score.findOne({
      user: userId,
    });

    if (!userExamScore || userExamScore[exam_id] === undefined) {
      return res
        .status(404)
        .json({ message: "User score not found or exam score missing" });
    }

    // Count scores greater than the user's exam score for the given exam_id
    const higherScoresCount = await Score.countDocuments({
      [exam_id]: { $gt: userExamScore[exam_id] },
    });

    // User's rank is the count of higher scores + 1 (1-indexed)
    const userExamRank = higherScoresCount + 1;

    // Send both rank and score
    return res.status(200).json({
      rank: userExamRank,
      score: userExamScore[exam_id],
      _id: userId,
    });
  } catch (err) {
    console.error("Error fetching user rank:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getExamLeaderboard = async (req, res) => {
  const { exam_id } = req.params;
  try {
    const leaderboard = await Score.aggregate([
      {
        $sort: {
          [exam_id]: -1,
        },
      },

      {
        $limit: 10,
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo",
      },
      {
        $project: {
          [exam_id]: 1,
          "userInfo.name": 1,
          "userInfo.image": 1,
          "userInfo._id": 1,
        },
      },
    ]);
    const transformedLeaderboard = leaderboard.map((item) => ({
      ...item,
      score: item[exam_id],
      [exam_id]: undefined,
    }));
    res.send(transformedLeaderboard);
  } catch (err) {
    console.log("Error fetching Leaderboard: ", err);
    res.status(500).send("Internal Server Error");
  }
};

export const getAllExamLeaderboards = async (req, res) => {
  let leaderboards = [];

  try {
    for (let exam_id = 1001; exam_id <= 1010; exam_id++) {
      const leaderboard = await Score.aggregate([
        {
          $sort: {
            [exam_id]: -1,
          },
        },
        {
          $limit: 10,
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "userInfo",
          },
        },
        {
          $unwind: "$userInfo",
        },
        {
          $project: {
            [exam_id]: 1,
            "userInfo.name": 1,
            "userInfo.image": 1,
            "userInfo._id": 1,
          },
        },
      ]);
      const transformedLeaderboard = leaderboard.map((item) => ({
        ...item,
        score: item[exam_id],
        [exam_id]: undefined,
      }));

      leaderboards.push({
        exam_id: exam_id.toString(),
        leaderboard: transformedLeaderboard,
      });
    }

    res.send(leaderboards);
  } catch (err) {
    console.log("Error fetching Leaderboards: ", err);
    res.status(500).send("Internal Server Error");
  }
};

export const getAllEsdsxamLeaderboards = async (req, res) => {
  const leaderboards = [];

  try {
    for (let exam_id = 1001; exam_id <= 1010; exam_id++) {
      const leaderboard = await Score.aggregate([
        {
          $match: {
            exam_id: exam_id,
          },
        },
        {
          $sort: {
            score: -1,
          },
        },
        {
          $limit: 10,
        },
        {
          $project: {
            exam_id: 1,
            user: 1,
            score: `$${exam_id}`,
          },
        },
      ]);

      const transformedLeaderboard = leaderboard.map((item) => ({
        ...item,
        score: item[exam_id],
        [exam_id]: undefined,
      }));

      leaderboards.push({
        exam_id: exam_id.toString(),
        leaderboard: transformedLeaderboard,
      });
    }

    res.send(leaderboards);
  } catch (err) {
    console.log("Error fetching Leaderboards: ", err);
    res.status(500).send("Internal Server Error");
  }
};
