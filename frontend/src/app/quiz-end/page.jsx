"use client";
import { QuizContext } from "@/contexts/QuizContext";
import { ScoreContext } from "@/contexts/ScoreContext";
import { exams } from "@/examData";
import React, { useContext } from "react";
import { Gauge } from "@mui/x-charts/Gauge";

const page = () => {
  console.log("rendered quiz-end page");
  const { score } = useContext(ScoreContext);
  const { quizData } = useContext(QuizContext);

  const quizQuestions = quizData.questions;

  const filteredScores = Object.keys(score).reduce((acc, key) => {
    const examId = key;
    const s = score[key];

    const matchedQuestion = quizQuestions.find(
      (question) => question.exam_id === examId
    );
    if (matchedQuestion) {
      acc[examId] = s;
    }

    return acc;
  }, {});

  console.log(filteredScores);

  const calculateTotalScore = () => {
    let tScore = 0;
    Object.keys(score).forEach((exam_id) => {
      tScore += score[exam_id];
    });
    return tScore;
  };

  const totalScore = calculateTotalScore();

  return (
    <div className="lg:text-lg mx-auto">
      {/* headers */}
      <div className="my-6 ">
        <h1 className="text-3xl lg:text-4xl mb-2 font-semibold text-center ">
          QUIZ ENDED
        </h1>
        <p className="text-sm text-center">
          Congratulation on successfully completing this round of quiz.
        </p>
      </div>
      {/* <section>
        <Leaderboard />
      </section> */}

      <div className=" ">
        <p className="font-semibold mb-3 text-xl text-center">
          Your Final Score:
        </p>
        {/* <ul className="py-2">
          <li className="flex justify-between p-3 text-primary font-semibold text-xl rounded-lg">
            <p>Total:</p>
            <p>{totalScore}</p>
          </li>
          {Object.keys(filteredScores).map((item, index) => (
            <li
              key={item}
              className="flex justify-between p-2 hover:bg-gray/20 duration-300"
            >
              <p>
                {exams.find((exam) => exam.exam_id === item)?.name || item} :
              </p>
              <p>{score[1000 + 1 + index]}</p>
            </li>
          ))}
        </ul> */}
        <ul class="py-2">
          <li class="flex justify-between p-3 font-semibold text-primary  text-xl rounded-lg">
            <p>Total:</p>
            <p>0</p>
          </li>
          <li class="flex justify-between p-3 text-black  rounded-lg">
            <p>TSC :</p>
            <p>0</p>
          </li>
          <li class="flex justify-between p-3 text-black  rounded-lg">
            <p>1003 :</p>
            <p>0</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default page;
