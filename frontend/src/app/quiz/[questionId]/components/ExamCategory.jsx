import React from "react";
import { exams } from "@/examData";

const ExamCategory = ({ question }) => {
  const category =
    exams.find((exam) => exam.exam_id === question.exam_id)?.name ||
    question.exam_id;

  return <div>Category: {category} </div>;
};

export default ExamCategory;
