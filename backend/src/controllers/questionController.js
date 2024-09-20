import { Question } from "../../api/index.js";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

//Fetch random questions from one exam
export const getExamQuestions = async (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  const { exam_id } = req.params;
  try {
    // Validation
    if (!exam_id) {
      return res.status(400).json({ message: "examId is required" });
    }

    // fetch question with category and limit
    const questions = await Question.aggregate([
      { $match: { exam_id } },
      { $sample: { size: limit } },
    ]);
    res.json(questions).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to fetch Question" });
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
    res.status(500).json({ message: "Failed to fetch random data" });
  }
};

export const getQuestionById = async (req, res) => {
  const questionId = req.params.questionId;
  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).send({ message: "Question Not found" });
    }
    return res
      .status(200)
      .json({ message: "Question fetched Successfully", question });
  } catch (error) {}
};

export const changeQuestionFormat = async (req, res) => {
  console.log("Updating Database");
  try {
    // const updateResult = await Question.updateMany({}, [
    //   {
    //     $set: {
    //       opt_A: {
    //         name: "$opt_a",
    //         type: "text",
    //       },
    //       opt_B: {
    //         name: "$opt_b",
    //         type: "text",
    //       },
    //       opt_C: {
    //         name: "$opt_c",
    //         type: "text",
    //       },
    //       opt_D: {
    //         name: "$opt_d",
    //         type: "text",
    //       },
    //     },
    //   },
    // ]);

    const updateResult = await Question.updateMany(
      {},
      {
        $unset: {
          name: "",
        },
      }
    );

    console.log(updateResult);

    console.log(`${updateResult.modifiedCount} documents were updated.`);
    return res
      .status(200)
      .json({ message: "Question format updated successfully" });
  } catch (error) {
    console.error("Error updating documents:", error);
    return res
      .status(500)
      .json({ message: "Failed to update question format" });
  }
};

const deleteLocalFiles = (req) => {
  // Delete uploaded files if they exist
  if (req.files) {
    Object.values(req.files).forEach((fileArray) => {
      fileArray.forEach((file) => {
        const filePath = file.path;
        console.log("Deleting file", filePath);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error deleting file ${filePath}:`, err);
          } else {
            console.log(`Successfully deleted file: ${filePath}`);
          }
        });
      });
    });
  }
};

export const addQuestion = async (req, res) => {
  console.log("files", req.files);
  console.log("body", req.body);

  try {
    const {
      id,
      exam_id,
      description,
      question,
      opt_A,
      opt_B,
      opt_C,
      opt_D,
      opt_correct,
    } = req.body;

    if (
      !id ||
      !exam_id ||
      !question ||
      !opt_A ||
      !opt_B ||
      !opt_C ||
      !opt_D ||
      !opt_correct
    ) {
      deleteLocalFiles(req);
      return res.status(400).json({ message: "Missing required fields" });
    }

    const validExamIds = [
      "1001",
      "1002",
      "1003",
      "1004",
      "1005",
      "1006",
      "1007",
      "1008",
      "1009",
      "1010",
    ];

    if (!validExamIds.includes(exam_id)) {
      deleteLocalFiles(req);
      return res.status(400).json({ message: "Invalid exam_id" });
    }

    // Validate question type
    if (question.type && !["text", "image"].includes(question.type)) {
      deleteLocalFiles(req);
      return res.status(400).json({ message: "Invalid question type" });
    }

    // Validate image is present if type is image
    if (
      question.type === "image" &&
      (!req.files || !req.files["question[image]"])
    ) {
      deleteLocalFiles(req);
      return res
        .status(400)
        .json({ message: "Question type is image but image is not provided" });
    }

    // Validate question text or image is present
    if (!question.name && !question.image) {
      deleteLocalFiles(req);
      return res
        .status(400)
        .json({ message: "Question text or image is required" });
    }

    // Validate options
    const options = [opt_A, opt_B, opt_C, opt_D];
    for (const [index, opt] of options.entries()) {
      if (opt.type && !["text", "image"].includes(opt.type)) {
        deleteLocalFiles(req);
        return res.status(400).json({
          message: `Invalid type for option ${String.fromCharCode(65 + index)}`,
        });
      }
      // checks opt_A[image] , opt_B[image],...
      if (
        opt.type === "image" &&
        (!req.files ||
          !req.files[`opt_${String.fromCharCode(65 + index)}[image]`])
      ) {
        deleteLocalFiles(req);
        return res.status(400).json({
          message: `Type is Image but image is not provided for option ${String.fromCharCode(
            65 + index
          )}`,
        });
      }
      if (!opt.name && !opt.image) {
        deleteLocalFiles(req);
        return res.status(400).json({
          message: `Text or image is required for option ${String.fromCharCode(
            65 + index
          )}`,
        });
      }
    }

    // Validate correct option
    if (!["A", "B", "C", "D"].includes(opt_correct)) {
      deleteLocalFiles(req);
      return res.status(400).json({ message: "Invalid opt_correct value" });
    }

    // Prepare question data
    let questionData = {
      name: question.name,
      type: question.type,
    };

    if (question.type === "image") {
      console.log("question image :", req.files["question[image]"][0].path);
      const result = await cloudinary.uploader.upload(
        req.files["question[image]"][0].path
      );
      if (!result) {
        deleteLocalFiles(req);
        return res
          .status(400)
          .json({ message: "Failed to upload question image" });
      }
      console.log("Successfully uploaded question image");
      questionData.image = result.secure_url;
      fs.unlinkSync(req.files["question[image]"][0].path);
    }

    // Process options
    const processedOptions = {};
    const optionKeys = ["opt_A", "opt_B", "opt_C", "opt_D"];

    for (const key of optionKeys) {
      const option = req.body[key];
      processedOptions[key] = {
        name: option.name,
        type: option.type || "text",
      };

      if (option.type === "image") {
        const fileKey = `${key}[image]`;
        if (!req.files[fileKey]) {
          deleteLocalFiles(req);
          return res
            .status(400)
            .json({ message: `Image file not found for ${key}` });
        }
        try {
          console.log("req file :", fileKey, req.files[fileKey]);
          const cloudinaryResult = await cloudinary.uploader.upload(
            req.files[fileKey][0].path
          );
          processedOptions[key].image = cloudinaryResult.secure_url;
          fs.unlinkSync(req.files[fileKey][0].path);
        } catch (error) {
          console.error(`Error uploading image for ${key}:`, error);
          deleteLocalFiles(req);
          return res
            .status(500)
            .json({ message: `Failed to upload image for ${key}` });
        }
      }
    }

    const newQuestion = new Question({
      id,
      exam_id,
      description,
      question: questionData,
      opt_A: processedOptions.opt_A,
      opt_B: processedOptions.opt_B,
      opt_C: processedOptions.opt_C,
      opt_D: processedOptions.opt_D,
      opt_correct,
    });

    console.log("newQuestion", newQuestion);

    // const savedQuestion = await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    deleteLocalFiles(req);
    console.error("Error adding question:", error);
    res.status(500).json({ message: "Failed to add question" });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      exam_id,
      description,
      question,
      opt_A,
      opt_B,
      opt_C,
      opt_D,
      opt_correct,
    } = req.body;

    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      {
        exam_id,
        description,
        question: {
          name: question.name,
          type: question.type,
        },
        opt_A: {
          name: opt_A.name,
          type: opt_A.type,
        },
        opt_B: {
          name: opt_B.name,
          type: opt_B.type,
        },
        opt_C: {
          name: opt_C.name,
          type: opt_C.type,
        },
        opt_D: {
          name: opt_D.name,
          type: opt_D.type,
        },
        opt_correct,
      },
      { new: true, runValidators: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ message: "Failed to update question" });
  }
};
