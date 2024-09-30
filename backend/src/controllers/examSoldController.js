import { User, Exam, ExamSold } from "../../api";

export const addExamSold = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userId = user._id;
    const { examId, basePrice, boughtPrice, discount } = req.body;

    if (!examId || !userId || basePrice == null || boughtPrice == null) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found." });
    }

    const examExists = await Exam.findById(examId);
    if (!examExists) {
      return res.status(404).json({ message: "Exam not found." });
    }

    const newExamSold = new ExamSold({
      examId,
      userId,
      basePrice,
      boughtPrice,
      discount: discount || 0,
    });

    const savedExamSold = await newExamSold.save();

    return res.status(201).json(savedExamSold);
  } catch (error) {
    console.error("Error creating exam sold record:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

export const updateExamSold = async (req, res) => {
  try {
    const { id } = req.params;
    const { exam_id, examId, userId, basePrice, boughtPrice, discount } =
      req.body;

    if (
      !exam_id ||
      !examId ||
      !userId ||
      basePrice == null ||
      boughtPrice == null
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found." });
    }

    const examExists = await Exam.findById(examId);
    if (!examExists) {
      return res.status(404).json({ message: "Exam not found." });
    }

    const updatedExamSold = await ExamSold.findByIdAndUpdate(
      id,
      {
        exam_id,
        examId,
        userId,
        basePrice,
        boughtPrice,
        discount: discount || 0,
      },
      { new: true }
    );

    if (!updatedExamSold) {
      return res.status(404).json({ message: "Record not found." });
    }

    return res.status(200).json(updatedExamSold);
  } catch (error) {
    console.error("Error updating exam sold record:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
