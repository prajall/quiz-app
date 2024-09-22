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
    return res.status(200).json(question);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch question" });
  }
};

export const changeQuestionFormat = async (req, res) => {
  console.log("Updating Database");
  try {
    const updateResult = await Question.updateMany({}, [
      {
        $set: {
          chapter: "",
        },
      },
    ]);

    // const updateResult = await Question.updateMany(
    //   {},
    //   {
    //     $unset: {
    //       name: "",
    //     },
    //   }
    // );

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
      !exam_id ||
      // !question ||
      // !opt_A ||
      // !opt_B ||
      // !opt_C ||
      // !opt_D ||
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

    // Validate image is present if question image is provided
    if (!question && (!req.files || !req.files["questionImage"])) {
      deleteLocalFiles(req);
      return res
        .status(400)
        .json({ message: "Question Text or Image is required" });
    }

    // Validate options
    const options = [opt_A, opt_B, opt_C, opt_D];
    for (const [index, opt] of options.entries()) {
      if (
        !opt &&
        (!req.files ||
          !req.files[`opt_${String.fromCharCode(65 + index)}Image`])
      ) {
        deleteLocalFiles(req);
        return res.status(400).json({
          message: `Either Text or Image is required for option ${String.fromCharCode(
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
      name: question,
      image: "",
      image_public_id: "",
    };

    if (req.files.questionImage) {
      console.log("question image :", req.files["questionImage"][0].path);
      const result = await cloudinary.uploader.upload(
        req.files["questionImage"][0].path
      );
      if (!result) {
        deleteLocalFiles(req);
        return res
          .status(400)
          .json({ message: "Failed to upload question image" });
      }
      console.log("Successfully uploaded question image");
      questionData.image = result.secure_url;
      questionData.image_public_id = result.public_id;
      fs.unlinkSync(req.files["questionImage"][0].path);
    }

    // Process options
    const processedOptions = {};
    const optionKeys = ["opt_A", "opt_B", "opt_C", "opt_D"];

    for (const key of optionKeys) {
      const option = req.body[key];
      processedOptions[key] = {
        name: option,
      };

      if (req.files[`${key}Image`]) {
        const fileKey = `${key}Image`;

        try {
          console.log("req file :", fileKey, req.files[fileKey]);
          const cloudinaryResult = await cloudinary.uploader.upload(
            req.files[fileKey][0].path
          );
          processedOptions[key].image = cloudinaryResult.secure_url;
          processedOptions[key].image_public_id = cloudinaryResult.public_id;
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

    console.log("processedOptions", processedOptions);
    console.log("QuestionData", questionData);

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

    const savedQuestion = await newQuestion.save();
    return res.status(201).json(savedQuestion);
    // return res.status(201).json(newQuestion);
  } catch (error) {
    deleteLocalFiles(req);
    console.error("Error adding question:", error);
    res.status(500).json({ message: "Failed to add question" });
  }
};
export const updateQuestion = async (req, res) => {
  const { questionId } = req.params;
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
    const newFiles = req.files;
    console.log("Changed files", newFiles);

    if (!exam_id || !opt_correct) {
      deleteLocalFiles(req);
      return res.status(400).json({ message: "Missing required fields" });
    }

    const questionDoc = await Question.findById(questionId);
    console.log("questionDoc", questionDoc);

    if (!questionDoc) {
      deleteLocalFiles(req);
      return res.status(404).json({ message: "Question not found" });
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

    // Validate image is present if question image is provided
    if (!question && (!req.files || !req.files["questionImage"])) {
      deleteLocalFiles(req);
      return res
        .status(400)
        .json({ message: "Question Text or Image is required" });
    }

    // Validate options
    const options = [opt_A, opt_B, opt_C, opt_D];
    for (const [index, opt] of options.entries()) {
      if (
        !opt &&
        (!req.files ||
          !req.files[`opt_${String.fromCharCode(65 + index)}Image`])
      ) {
        deleteLocalFiles(req);
        return res.status(400).json({
          message: `Either Text or Image is required for option ${String.fromCharCode(
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
      name: question,
      image: "",
      image_public_id: "",
    };

    if (newFiles["questionImage"]) {
      console.log("question image :", req.files["questionImage"][0].path);
      const result = await cloudinary.uploader.upload(
        newFiles["questionImage"][0].path
      );
      if (!result) {
        deleteLocalFiles(req);
        return res
          .status(400)
          .json({ message: "Failed to upload question image" });
      }
      console.log("Successfully uploaded question image");
      questionData.image = result.secure_url;
      questionData.image_public_id = result.public_id;
      fs.unlinkSync(newFiles["questionImage"][0].path);
    }

    // Process options
    const processedOptions = {};
    const optionKeys = ["opt_A", "opt_B", "opt_C", "opt_D"];

    for (const key of optionKeys) {
      const option = req.body[key];
      processedOptions[key] = {
        name: option,
      };

      if (newFiles[`${key}Image`]) {
        const fileKey = `${key}Image`;
        const optionImagePath = newFiles[fileKey][0].path;
        const cloudinaryResult = await cloudinary.uploader.upload(
          optionImagePath
        );
        // Delete old image from Cloudinary
        if (questionDoc[key].image && questionDoc[key].image_public_id) {
          const publicId = questionDoc[key].image_public_id;
          const deleted = await cloudinary.uploader.destroy(publicId);
          if (deleted) {
            processedOptions[key].image = cloudinaryResult.secure_url;
            processedOptions[key].image_public_id = cloudinaryResult.public_id;
          }
        }
      } else if (questionDoc[key].image) {
        processedOptions[key].image = questionDoc[key].image;
        processedOptions[key].image_public_id =
          questionDoc[key].image_public_id;
      }
    }

    // Update the question document
    questionDoc.exam_id = exam_id;
    questionDoc.description = description;
    questionDoc.question = questionData;
    questionDoc.opt_A = processedOptions.opt_A;
    questionDoc.opt_B = processedOptions.opt_B;
    questionDoc.opt_C = processedOptions.opt_C;
    questionDoc.opt_D = processedOptions.opt_D;
    questionDoc.opt_correct = opt_correct;

    // const updatedQuestion = await questionDoc.save();
    console.log("updated questionDoc:", questionDoc);
    return res.status(200).json({
      message: "Question updated successfully",
      question: questionDoc,
    });
  } catch (error) {
    deleteLocalFiles(req);
    console.error("Error adding question:", error);
    res.status(500).json({ message: "Failed to add question" });
  }
};

// export const updateQuestion = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       exam_id,
//       description,
//       question,
//       opt_A,
//       opt_B,
//       opt_C,
//       opt_D,
//       opt_correct,
//     } = req.body;

//     const updatedQuestion = await Question.findByIdAndUpdate(
//       id,
//       {
//         exam_id,
//         description,
//         question: {
//           name: question.name,
//           type: question.type,
//         },
//         opt_A: {
//           name: opt_A.name,
//           type: opt_A.type,
//         },
//         opt_B: {
//           name: opt_B.name,
//           type: opt_B.type,
//         },
//         opt_C: {
//           name: opt_C.name,
//           type: opt_C.type,
//         },
//         opt_D: {
//           name: opt_D.name,
//           type: opt_D.type,
//         },
//         opt_correct,
//       },
//       { new: true, runValidators: true }
//     );

//     if (!updatedQuestion) {
//       return res.status(404).json({ message: "Question not found" });
//     }

//     res.status(200).json(updatedQuestion);
//   } catch (error) {
//     console.error("Error updating question:", error);
//     res.status(500).json({ message: "Failed to update question" });
//   }
// };

export const updatedQuestion = async (req, res) => {
  const { questionId } = req.params;
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
  const newFiles = req.files;
  console.log("newFiles", newFiles);
  console.log("Body: ", req.body);

  try {
    if (!questionId) {
      deleteLocalFiles(req);
      return res.status(400).json({ message: "Question ID is required" });
    }

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

    const questionDoc = await Question.findById(questionId);
    console.log("questionDoc", questionDoc);

    if (!questionDoc) {
      deleteLocalFiles(req);
      return res.status(404).json({ message: "Question not found" });
    }

    // Validate correct option
    if (!["A", "B", "C", "D"].includes(opt_correct)) {
      deleteLocalFiles(req);
      return res.status(400).json({ message: "Invalid opt_correct value" });
    }

    // Update question data
    let questionData = {
      name: question.name,
    };

    if (newFiles["question[image]"]) {
      const questionImagePath = newFiles["question[image]"][0].path;
      const result = await cloudinary.uploader.upload(questionImagePath);
      if (!result) {
        deleteLocalFiles(req);
        return res
          .status(400)
          .json({ message: "Failed to upload question image" });
      }

      const publicId = questionDoc.question.image_public_id;

      const deleted = await cloudinary.uploader.destroy(publicId);

      if (deleted) {
        questionData.image = result.secure_url;
        questionData.image_public_id = result.public_id;
      }
      fs.unlinkSync(questionImagePath);
    }

    // Process options
    const processedOptions = {};
    const optionKeys = ["opt_A", "opt_B", "opt_C", "opt_D"];

    for (const key of optionKeys) {
      const option = req.body[key];
      processedOptions[key] = {
        name: option.name,
      };
      console.log("processedOptions", processedOptions);

      if (newFiles[`${key}Image`]) {
        const fileKey = `${key}Image`;
        const optionImagePath = newFiles[fileKey][0].path;
        const cloudinaryResult = await cloudinary.uploader.upload(
          optionImagePath
        );
        // Delete old image from Cloudinary
        if (questionDoc[key].image && questionDoc[key].image_public_id) {
          const publicId = questionDoc[key].image_public_id;
          const deleted = await cloudinary.uploader.destroy(publicId);
          if (deleted) {
            processedOptions[key].image = cloudinaryResult.secure_url;
            processedOptions[key].image_public_id = cloudinaryResult.public_id;
          }
        }
      } else if (questionDoc[key].image) {
        processedOptions[key].image = questionDoc[key].image;
        processedOptions[key].image_public_id =
          questionDoc[key].image_public_id;
      }
    }

    // Update the question document
    questionDoc.exam_id = exam_id;
    questionDoc.description = description;
    questionDoc.question = questionData;
    questionDoc.opt_A = processedOptions.opt_A;
    questionDoc.opt_B = processedOptions.opt_B;
    questionDoc.opt_C = processedOptions.opt_C;
    questionDoc.opt_D = processedOptions.opt_D;
    questionDoc.opt_correct = opt_correct;

    // const updatedQuestion = await questionDoc.save();
    console.log("updated questionDoc:", questionDoc);
    return res.status(200).json({
      message: "Question updated successfully",
      question: questionDoc,
    });
  } catch (error) {
    console.error("Error updating question:", error);
    deleteLocalFiles(req);
    return res.status(500).json({ message: "Failed to update question" });
  }
};
