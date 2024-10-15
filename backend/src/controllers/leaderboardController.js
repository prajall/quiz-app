import User from "../../api/index.js";

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
    const { examId } = req.query;

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
