import { Score } from "../index.js";

export const getOverallLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Score.aggregate([
      {
        $sort: {
          total: -1,
        },
      },

      {
        $limit: 20,
      },
      {
        $project: {
          total: 1,
          user: 1,
        },
      },
    ]);
    res.send(leaderboard);
  } catch (err) {
    console.log("Error fetching Leaderboard: ", err);
    res.status(500).send("Internal Server Error");
  }
};

export const getUserOverallRanking = async (req, res) => {
  const { userId } = req.params;

  try {
    const userScore = await Score.findOne({ user: userId });

    if (!userScore) {
      return res.status(404).send("User score not found");
    }

    const higherScoresCount = await Score.countDocuments({
      total: { $gt: userScore.total },
    });

    const userRank = higherScoresCount + 1;

    return res.status(200).send(userRank.toString());
  } catch (err) {
    console.error("Error fetching user rank:", err);
    return res.status(500).send("Internal Server Error");
  }
};

export const getUserExamRanking = async (req, res) => {
  const { userId, exam_id } = req.params;
  try {
    const userExamScore = await Score.findOne({ user: userId });

    if (!userExamScore) {
      return res.status(404).send("User score not found");
    }

    // Count scores greater than the user's exam score
    const higherScoresCount = await Score.countDocuments({
      [exam_id]: { $gt: userExamScore[exam_id] },
    });

    // User's rank is the count of higher scores + 1 (1-indexed)
    const userExamRank = higherScoresCount + 1;

    return res.status(200).send(userExamRank.toString());
  } catch (err) {
    console.error("Error fetching user rank:", err);
    return res.status(500).send("Internal Server Error");
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
        $limit: 20,
      },
      {
        $project: {
          [exam_id]: 1,
          user: 1,
        },
      },
    ]);
    console.log(leaderboard);
    res.send(leaderboard);
  } catch (err) {
    console.log("Error fetching Leaderboard: ", err);
    res.status(500).send("Internal Server Error");
  }
};
