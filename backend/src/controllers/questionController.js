import { Question } from "../index.js";

//Fetch random questions from one exam
export const getExamQuestions = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const { exam_id } = req.params;

    // Validation
    if (!exam_id) {
      return res.status(400).json({ message: "examId is required" });
    }

    // fetch question with category and limit
    const questions = await Question.aggregate([
      { $match: { exam_id } },
      { $sample: { size: limit } },
    ]);
    res.send(questions).status(200);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to fetch random data", error: err });
  }
};
export const getRandomQuestions = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;

    // fetch question with limit
    const questions = await Question.aggregate([{ $sample: { size: limit } }]);
    if (!questions) {
      res.send("No Questions Found");
    }
    res.send(questions).status(200);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to fetch random data", error: err });
  }
};
