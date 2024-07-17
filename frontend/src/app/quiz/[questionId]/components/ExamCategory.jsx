import React from "react";
import { exams } from "@/examData";

const ExamCategory = ({ question }) => {
  const category =
    exams.find((exam) => exam.exam_id === question.exam_id)?.name ||
    question.exam_id;

  return (
    <div className="text-black font-semibold ">
      Category:{" "}
      <span className="text-primary font-semibold text-xl"> {category}</span>{" "}
    </div>
  );
};

export default ExamCategory;
