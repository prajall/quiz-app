import mongoose from "mongoose";
const { Schema } = mongoose;

export const customFieldsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  cf_id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});
