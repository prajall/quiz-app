import Score from "@/app/quiz/[questionId]/components/Score";
import axios from "axios";
import ExamCategory from "./components/ExamCategory";
import Timer from "@/app/quiz/[questionId]/components/Timer";
import React from "react";
import ProgressBar from "./components/ProgressBar";
import Head from "next/head";

const QuestionLayout = async ({ params, children }) => {
  const questionId = params.questionId;
  if (!questionId) {
    return null;
  }
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/question/${questionId}`,
    { withCredentials: true, headers: { apiKey: "123456789" } }
  );
  const question = response.data;

  return (
    <>
      <Head>
        <title>{question?.question?.name || "QuizPro"}</title>
        <meta name="description" content={question.question?.name} />
      </Head>
      <div className="my-4 space-y-6 ">
        <div className="grid grid-cols-3 pb-4 text-sm sm:text-md border-b border-opacity-50 border-black  ">
          <ExamCategory question={question} />
          <Timer />
          <Score />
        </div>
        <ProgressBar />
        <div className=" mx-auto space-y-4 md:space-y-8  sm:border-gray sm:border sm:shadow-md sm:p-4  md:p-6 lg:p-8 rounded-lg">
          <p className="font-semibold text-xl md:text-2xl text-black min-h-24 xl:min-h-16 flex items-center leading-[1.5]">
            Q. {question?.question.name}
          </p>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default QuestionLayout;
