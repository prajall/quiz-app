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
    setQuizData((prev) => {
      const nextQuestion = prev.currentQuestion + 1;
      const isLastQuestion = nextQuestion >= prev.questions.length;

      // Update state
      const updatedData = {
        ...prev,
        currentQuestion: nextQuestion,
      };

      // Navigate after state is updated
      if (isLastQuestion) {
        endQuiz();
        router.push(`/quiz-end`);
      } else {
        router.push(`/quiz/${prev.questions[nextQuestion]._id}`);
      }

      return updatedData;
    });
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
  const defaultButtonClassnames =
    " py-1 px-4 m-1 border border-gray-400 rounded ";

  return (
    <div>
      <button
        onClick={() => handleClick("A")}
        className={`${defaultButtonClassnames} ${
          answered
            ? optionChoosen === "A"
              ? optionChoosen === correctOption
                ? "bg-correct text-white"
                : "bg-incorrect"
              : ""
            : "hover:bg-gray"
        } ${
          answered && question.opt_correct == "A"
            ? " ring-correct ring-2 border-white"
            : ""
        } `}
        disabled={answered}
      >
        {question.opt_a}
      </button>

      <button
        onClick={() => handleClick("B")}
        className={`${defaultButtonClassnames} ${
          answered
            ? optionChoosen === "B"
              ? optionChoosen === correctOption
                ? "bg-correct text-white"
                : "bg-incorrect text-white ring-incorrect ring-2"
              : ""
            : "hover:bg-gray"
        } ${
          answered && question.opt_correct == "B" ? " ring-correct ring-2 " : ""
        } `}
        disabled={answered}
      >
        {question.opt_b}
      </button>
      <button
        onClick={() => handleClick("C")}
        className={`${defaultButtonClassnames} ${
          answered
            ? optionChoosen === "C"
              ? optionChoosen === correctOption
                ? "bg-correct text-white"
                : "bg-incorrect text-white ring-incorrect ring-2"
              : ""
            : "hover:bg-gray"
        } ${
          answered && question.opt_correct == "C"
            ? " ring-correct ring-2 border-white"
            : ""
        } `}
        disabled={answered}
      >
        {question.opt_c}
      </button>
      <button
        onClick={() => handleClick("D")}
        className={`${defaultButtonClassnames} ${
          answered
            ? optionChoosen === "D"
              ? optionChoosen === correctOption
                ? "bg-correct text-white"
                : "bg-incorrect text-white ring-incorrect ring-2"
              : ""
            : "hover:bg-gray"
        } ${
          answered && question.opt_correct == "D"
            ? " ring-correct ring-2 border-white"
            : ""
        } `}
        disabled={answered}
      >
        {question.opt_d}
      </button>

      <div>
        <button
          onClick={handleFinish}
          className="px-4 py-1 rounded-lg m-2 text-white bg-incorrect"
        >
          Finish
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-1 rounded-lg m-2 text-white bg-primary"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default React.memo(AnswerList);
