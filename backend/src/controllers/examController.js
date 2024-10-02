import { Exam, UserExam } from "../../api/index.js";

export const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find().exec();
    if (!exams) {
      return res.status(404).json({ message: "No Exams" });
    }

    return res.status(200).json(exams);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getAllExamsWithScores = async (req, res) => {
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
    console.log(userExamDoc);
    const userExamMap = {};
    userExamDoc.forEach((userExam) => {
      userExamMap[userExam.exam.toString()] = userExam.score;
    });

    const examsWithUserScore = exams.map((exam) => {
      const userScore = userExamMap[exam._id.toString()] || 0;
      return {
        ...exam.toObject(),
        userScore,
      };
    });

    return res.status(200).json(examsWithUserScore);
  } catch (err) {
    console.error("Error fetching exams or user exam data:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addExam = async (req, res) => {
  try {
    console.log(req.body);
    const { exam_id, title, price, discount, subTitle, courses } = req.body;

    if (!exam_id || !title || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const existingExam = await Exam.findOne({ exam_id }).exec();
    if (existingExam) {
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteExam = async (req, res) => {
  try {
    const exam_id = req.params.exam_id;
    if (!exam_id) {
      return res.status(400).json({ message: "Exam ID is required" });
    }
    const exam = await Exam.findOneAndDelete({ exam_id }).exec();
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.status(200).json({ message: "Exam deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editExam = async (req, res) => {
  try {
    const { exam_id } = req.params;
    const { title, price, discount, subTitle } = req.body;

    if (!exam_id) {
      return res.status(400).json({ message: "exam_id is required" });
    }

    const existingExam = await Exam.findOne({ exam_id }).exec();
    if (!existingExam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    if (title) existingExam.title = title;
    if (price !== undefined) existingExam.price = price;
    if (discount !== undefined) existingExam.discount = discount;
    if (subTitle) existingExam.subTitle = subTitle;

    await existingExam.save();

    res.status(200).json(existingExam);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
