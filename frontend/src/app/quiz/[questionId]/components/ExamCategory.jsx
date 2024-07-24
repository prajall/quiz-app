import React from "react";
import { examIdToName, exams } from "@/examData";

const ExamCategory = ({ question }) => {
  const category = examIdToName(question.exam_id);

  return (
    <div className="text-black  font-semibold ">
      Category:{" "}
      <span className="text-primary font-semibold text-lg"> {category}</span>{" "}
    </div>
  );
};

export default ExamCategory;
