import { Exam } from "../models/examModel";

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

export const addExam = async (req, res) => {
  try {
    const { exam_id, name, price, discount } = req.body;
    if (!exam_id || !name || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const existingExam = await Exam.findOne({ exam_id }).exec();
    if (existingExam) {
      return res
        .status(400)
        .json({ message: "Exam with this ID already exists" });
    }
    const newExam = new Exam({
      exam_id,
      name,
      price,
      discount,
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
    const exam_id = req.params.exam_id;
    if (!exam_id) {
      return res.status(400).json({ message: "Exam ID is required" });
    }
    const exam = await Exam.findOne({ exam_id }).exec();
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    const { name, price, discount } = req.body;
    if (name) exam.name = name;
    if (price) exam.price = price;
    if (discount) exam.discount = discount;
    await exam.save();
    res.json(exam);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to edit exam" });
  }
};
