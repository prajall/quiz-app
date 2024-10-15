import { Exam, ExamSold, UserExam } from "../../api/index.js";
import logger from "../../logger.js";

const log = logger("examController.js");

export const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find().exec();
    if (!exams) {
      return res.status(404).json({ message: "No Exams" });
    }

    return res.status(200).json(exams);
  } catch (error) {
    log.error("Error Getting All Exams:", JSON.stringify(error));
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUsersExams = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const exams = await Exam.find().exec();
    if (!exams || exams.length === 0) {
      return res.status(404).json({ message: "No Exams found" });
    }

    const userExamDoc = await UserExam.find({ user: user._id }).exec();
    const userExamMap = {};
    userExamDoc.forEach((userExam) => {
      userExamMap[userExam.exam.toString()] = {
        score: userExam.score,
      };
    });

    const examSoldDoc = await ExamSold.find({ user: user._id }).exec();
    const examSoldMap = {};
    examSoldDoc.forEach((examSold) => {
      examSoldMap[examSold.exam.toString()] = true;
    });

    const examsWithUserData = exams.map((exam) => {
      const userExamData = userExamMap[exam._id.toString()] || {
        score: 0,
      };

      const premium = examSoldMap[exam._id.toString()] || false;

      return {
        ...exam.toObject(),
        userScore: userExamData.score,
        premium,
      };
    });

    return res.status(200).json(examsWithUserData);
  } catch (error) {
    log.error("Error fetching user's exam data:", JSON.stringify(error));
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addExam = async (req, res) => {
  try {
    const { exam_id, title, price, discount, subTitle, courses } = req.body;

    if (!exam_id || !title || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const examDoc = await Exam.findOne({ exam_id }).exec();
    if (examDoc) {
      return res
        .status(400)
        .json({ message: "Exam with this ID already exists" });
    }
    const totalQuestions = 0;
    const totalLevels = 0;
    const newExam = new Exam({
      exam_id,
      title,
      price,
      totalQuestions,
      totalLevels,
      discount,
      subTitle,
      courses,
    });
    await newExam.save();
    res.status(201).json(newExam);
  } catch (error) {
    log.error("Error Adding Exam", JSON.stringify(error));
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteExam = async (req, res) => {
  try {
    const examId = req.params.examId;
    if (!examId) {
      return res.status(400).json({ message: "Exam ID is required" });
    }
    const examDoc = await Exam.findOneAndDelete({ examId }).exec();
    if (!examDoc) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.status(200).json({ message: "Exam deleted successfully" });
  } catch (error) {
    log.error("Error Deleting Exam", JSON.stringify(error));
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editExam = async (req, res) => {
  try {
    const examId = req.params.examId;
    const { title, price, discount, subTitle } = req.body;

    if (!examId) {
      return res.status(400).json({ message: "examId is required" });
    }

    const examDoc = await Exam.findById(examId).exec();
    if (!examDoc) {
      return res.status(404).json({ message: "Exam not found" });
    }

    if (title) examDoc.title = title;
    if (price !== undefined) examDoc.price = price;
    if (discount !== undefined) examDoc.discount = discount;
    if (subTitle) examDoc.subTitle = subTitle;

    await examDoc.save();

    res.status(200).json(examDoc);
  } catch (error) {
    log.error("Error Editing Exam", JSON.stringify(error));
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getExamDetails = async (req, res) => {
  try {
    const { examId } = req.params;

    if (!examId) {
      return res.status(400).json({ message: "Exam ID is required" });
    }

    const exam = await Exam.findById(examId).exec();

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    return res.status(200).json(exam);
  } catch (error) {
    log.error("Error fetching exam details:", JSON.stringify(error));
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
