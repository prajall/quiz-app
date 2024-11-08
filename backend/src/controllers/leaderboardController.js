import { User, Exam, UserExam } from "../../api/index.js";

export const getOverallLeaderboard = async (req, res) => {
  try {
    const overallLeaderboard = await User.find()
      .sort({ totalScore: -1 })
      .limit(10)
      .select("etutor_id totalScore isPremium")
      .exec();

    if (!overallLeaderboard || overallLeaderboard.length === 0) {
      return res.status(404).json({ message: "No overall leaderboard data" });
    }

    return res.status(200).json({
      leaderboardType: "overall",
      leaderboard: overallLeaderboard,
    });
  } catch (error) {
    console.error("Error fetching overall leaderboard:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getExamLeaderboard = async (req, res) => {
  try {
    const { examId } = req.params;

    if (!examId) {
      return res.status(400).json({ message: "Exam ID is required" });
    }

    const examExists = await Exam.findById(examId);
    if (!examExists) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const examLeaderboard = await UserExam.find({ exam: examId })
      .populate("user", "etutor_id isPremium")
      .sort({ score: -1 })
      .limit(10)
      .select("user score totalCorrect totalAttempts")
      .exec();

    if (!examLeaderboard || examLeaderboard.length === 0) {
      return res
        .status(404)
        .json({ message: "No leaderboard data for this exam" });
    }

    return res.status(200).json({
      leaderboardType: "exam-specific",
      examId,
      leaderboard: examLeaderboard,
    });
  } catch (error) {
    console.error("Error fetching exam leaderboard:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserOverallRanking = async (req, res) => {
  try {
    const userData = req.user;

    const user = await User.findById(userData._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const higherScores = await User.countDocuments({
      totalScore: { $gt: user.totalScore },
    });

    const totalUsers = await User.countDocuments();

    return res.status(200).json({
      ranking: higherScores + 1,
      totalUsers,
      userData: {
        etutor_id: user.etutor_id,
        totalScore: user.totalScore,
      },
    });
  } catch (error) {
    console.error("Error fetching user ranking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserExamRanking = async (req, res) => {
  try {
    const { examId } = req.params;
    const userData = req.user;

    if (!examId) {
      return res.status(400).json({ message: "Exam ID is required" });
    }

    // Verify exam exists
    const examExists = await Exam.findById(examId);
    if (!examExists) {
      return res.status(404).json({ message: "Exam not found" });
    }

    // Get user's exam attempt
    const userExam = await UserExam.findOne({
      user: userData._id,
      exam: examId,
    });

    if (!userExam) {
      return res
        .status(404)
        .json({ message: "User has not attempted this exam" });
    }

    // Count number of users with higher scores
    const higherScores = await UserExam.countDocuments({
      exam: examId,
      score: { $gt: userExam.score },
    });

    const totalParticipants = await UserExam.countDocuments({ exam: examId });

    return res.status(200).json({
      ranking: higherScores + 1,
      totalParticipants,
      examData: {
        score: userExam.score,
        totalCorrect: userExam.totalCorrect,
        totalAttempts: userExam.totalAttempts,
      },
    });
  } catch (error) {
    console.error("Error fetching user exam ranking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
