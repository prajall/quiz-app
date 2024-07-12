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
