"use client";
import { QuizContext } from "@/contexts/QuizContext";
import { ScoreContext } from "@/contexts/ScoreContext";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

import React, { useContext, useEffect, useState } from "react";

const AnswerList = ({ question }) => {
  console.log("Rendered AnswerList");
  const { quizData, setQuizData, endQuiz } = useContext(QuizContext);
  const { score, incrementScore } = useContext(ScoreContext);
  const [answered, setAnswered] = useState(false);
  const [optionChoosen, setOptionChoosen] = useState(null);
  const correctOption = question.opt_correct;

  const router = useRouter();

  const handleClick = (option) => {
    setAnswered(true);
    setOptionChoosen(option);
    if (question.opt_correct === option) {
      incrementScore(question.exam_id);
      console.log(quizData);
    }
    console.log(score);
  };

  const handleNext = () => {
    setQuizData((prev) => ({
      ...prev,
      currentQuestion: prev.currentQuestion + 1,
    }));
    if (quizData.currentQuestion >= quizData.questions.length) {
      endQuiz();
      router.push(`/quiz-end`);
    }
    console.log("next question");
    router.push(`/quiz/${quizData.questions[quizData.currentQuestion]?._id}`);
  };

  const handleFinish = async () => {
    endQuiz();
    router.push("/quiz-end");
  };

  useEffect(() => {
    console.log("quizData during load:", quizData);
    if (!quizData.isPlaying) {
      console.log("Not playing redirecting /quiz");
      redirect("/quiz");
    }
    if (quizData.questions[quizData.currentQuestion]?.name != question.name) {
      console.log("wrong question, redirecting /quiz/current question");
      router.push(`/quiz/${quizData.questions[quizData.currentQuestion]?._id}`);
    }
  }, []);
  return (
    <div>
      <button
        onClick={() => handleClick("A")}
        className={` py-1 px-4 m-1 border border-gray-400 rounded ${
          answered
            ? optionChoosen === "A"
              ? optionChoosen === correctOption
                ? "bg-green-500"
                : "bg-red-400"
              : ""
            : "hover:bg-gray-100"
        } ${
          answered && optionChoosen != "A" && question.opt_correct == "A"
            ? " ring-green-500 ring-2"
            : ""
        } `}
        disabled={answered}
      >
        {question.opt_a}
      </button>

      <button
        onClick={() => handleClick("B")}
        className={` py-1 px-4 m-1 border border-gray-400 rounded ${
          answered
            ? optionChoosen === "B"
              ? optionChoosen === correctOption
                ? "bg-green-500"
                : "bg-red-400"
              : ""
            : "hover:bg-gray-100"
        } ${
          answered && optionChoosen != "B" && question.opt_correct == "B"
            ? " ring-green-500 ring-2"
            : ""
        } `}
        disabled={answered}
      >
        {question.opt_b}
      </button>
      <button
        onClick={() => handleClick("C")}
        className={` py-1 px-4 m-1 border border-gray-400 rounded ${
          answered
            ? optionChoosen === "C"
              ? optionChoosen === correctOption
                ? "bg-green-500"
                : "bg-red-400"
              : ""
            : "hover:bg-gray-100"
        } ${
          answered && optionChoosen != "C" && question.opt_correct == "C"
            ? " ring-green-500 ring-2"
            : ""
        } `}
        disabled={answered}
      >
        {question.opt_c}
      </button>
      <button
        onClick={() => handleClick("D")}
        className={` py-1 px-4 m-1 border border-gray-400 rounded ${
          answered
            ? optionChoosen === "D"
              ? optionChoosen === correctOption
                ? "bg-green-500"
                : "bg-red-400"
              : ""
            : "hover:bg-gray-100"
        } ${
          answered && optionChoosen != "D" && question.opt_correct == "D"
            ? " ring-green-500 ring-2"
            : ""
        } `}
        disabled={answered}
      >
        {question.opt_d}
      </button>

      <div>
        <button
          onClick={handleNext}
          className="px-4 py-1 rounded-lg m-2 bg-blue-300"
        >
          Next
        </button>
        <button
          onClick={handleFinish}
          className="px-4 py-1 rounded-lg m-2 bg-red-200"
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default AnswerList;
