import React from "react";
import { AppContext } from "@/contexts/AppContext";

const ExamCategory = ({ question }) => {
  const { appData } = useContext(AppContext);

  const exams = appData.exams ? appData.exams : [];

  return (
    <div className="text-black  font-semibold ">
      Category:{" "}
      <span className="text-primary font-semibold text-lg">
        {" "}
        {exams.find((exam) => exam.id === question.exam_id)?.title ||
          "Category"}
      </span>{" "}
    </div>
  );
};

export default ExamCategory;
