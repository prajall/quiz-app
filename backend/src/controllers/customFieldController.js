import { CustomField } from "../../api/index.js";
import logger from "../../logger.js";

const log = logger("customFieldController.js");

export const addCustomField = async (req, res) => {
  try {
    const { cf_id, title, content } = req.body;

    if (!cf_id || typeof cf_id !== "string" || cf_id.trim() === "") {
      return res
        .status(400)
        .json({ message: "cf_id is required and must be a non-empty string." });
    }

    if (!title || typeof title !== "string" || title.trim() === "") {
      return res
        .status(400)
        .json({ message: "Title is required and must be a non-empty string." });
    }

    if (!content || typeof content !== "string" || content.trim() === "") {
      return res.status(400).json({
        message: "Content is required and must be a non-empty string.",
      });
    }

    const existingField = await CustomField.findOne({ cf_id });
    if (existingField) {
      return res.status(400).json({
        message: "cf_id must be unique. This cf_id is already in use.",
      });
    }

    const newCustomField = new CustomField({
      cf_id: cf_id.trim(),
      title: title.trim(),
      content: content.trim(),
    });

    await newCustomField.save();

    return res.status(201).json(newCustomField);
  } catch (error) {
    log.error("Error creating custom field:", JSON.stringify(error));
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCustomField = async (req, res) => {
  try {
    const { cf_id } = req.params;

    if (!cf_id || typeof cf_id !== "string" || cf_id.trim() === "") {
      return res
        .status(400)
        .json({ message: "cf_id is required and must be a non-empty string." });
    }

    const customField = await CustomField.findOne({ cf_id: cf_id.trim() });

    if (!customField) {
      return res.status(404).json({ message: `Custom field not found.` });
    }

    return res.status(200).json(customField);
  } catch (error) {
    log.error("Error Getting custom Field:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
