import Score from "@/app/quiz/[questionId]/components/Score";
import axios from "axios";
import ExamCategory from "./components/ExamCategory";
import Timer from "@/app/quiz/[questionId]/components/Timer";
import React from "react";

const QuestionLayout = async ({ params, children }) => {
  const questionId = params.questionId;
  const response = await axios.get(
    `http://localhost:3001/question/${questionId}`
  );
  const question = response.data.question;

  const data = "this is a data";

  return (
    <>
      <div className="my-4 space-y-6 ">
        <div className="grid grid-cols-3 pb-4 text-sm sm:text-md border-b border-opacity-50 border-black  ">
          <ExamCategory question={question} />
          <Timer />
          <Score />
        </div>

        <div className=" mx-auto space-y-4 md:space-y-8  sm:border-gray sm:border sm:shadow-md sm:p-4  md:p-6 lg:p-8 rounded-lg">
          <p className="font-semibold text-xl md:text-2xl text-black min-h-24 xl:min-h-16 flex items-center leading-[1.5]">
            Q. {question.name}
          </p>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default QuestionLayout;
