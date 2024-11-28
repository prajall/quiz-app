import { User, Exam, UserExam } from "../../api/index.js";

export const getOverallLeaderboard = async (req, res) => {
  try {
    const user = req.user;

    const overallLeaderboard = await User.find()
      .sort({ totalScore: -1 })
      .limit(10)
      .select("etutor_id totalScore name")
      .exec();

    const overallLeaderboardWithRank = overallLeaderboard.map(
      (entry, index) => ({
        ...entry.toObject(),
        rank: index + 1,
      })
    );

    if (!overallLeaderboard || overallLeaderboard.length === 0) {
      return res.status(404).json({ message: "No overall leaderboard data" });
    }

    const higherScores = await User.countDocuments({
      totalScore: { $gt: user.totalScore },
    });

    const totalUsers = await User.countDocuments();

    return res.status(200).json({
      user: {
        rank: higherScores + 1,
        etutor_id: user.etutor_id,
        totalScore: user.totalScore,
        name: user.name,
      },
      totalUsers,
      leaderboardType: "overall",
      leaderboard: overallLeaderboardWithRank,
    });
  } catch (error) {
    console.error("Error fetching overall leaderboard:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getExamLeaderboard = async (req, res) => {
  try {
    const { examId } = req.params;
    const user = req.user;

    if (!examId) {
      return res.status(400).json({ message: "Exam ID is required" });
    }

    const examExists = await Exam.findById(examId);
    if (!examExists) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const examLeaderboard = await UserExam.find({ exam: examId })
      .populate("user", "etutor_id name")
      .sort({ score: -1 })
      .limit(10)
      .select("user score totalCorrect totalAttempts name")
      .exec();

    const examLeaderboardWithRank = examLeaderboard.map((entry, index) => ({
      ...entry.toObject(),
      name: entry.user.name,
      etutor_id: entry.user.etutor_id,
      rank: index + 1,
    }));

    examLeaderboardWithRank.forEach((entry) => {
      delete entry.user;
    });

    const userExam = await UserExam.findOne({
      user: user._id,
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
      leaderboardType: "exam-specific",
      exam: examExists.name,
      // userRanking: higherScores + 1,
      user: {
        etutor_id: user.etutor_id,
        name: user.name,
        score: userExam.score,
        rank: higherScores + 1,
      },
      totalParticipants,
      examId,
      leaderboard: examLeaderboardWithRank,
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

    const examExists = await Exam.findById(examId);
    if (!examExists) {
      return res.status(404).json({ message: "Exam not found" });
    }

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
