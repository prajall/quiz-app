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
  const [isLoading, setIsLoading] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [optionChoosen, setOptionChoosen] = useState(null);
  const correctOption = question.opt_correct;

  const router = useRouter();

  const handleClick = (option) => {
    setAnswered(true);
    setOptionChoosen(option);
    if (question.opt_correct === option) {
      incrementScore(question.exam_id);
      setQuizData((prev) => ({ ...prev, correct: prev.correct + 1 }));
      console.log(quizData);
    } else {
      setQuizData((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
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
      if (isLastQuestion) {
        endQuiz();
        router.push(`/quiz-end`);
      } else {
        // Navigate after state is updated
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
    "relative text-md pl-4 m-1 flex items-center border-2 border-gray h-10 text-left rounded-lg ";

  const defaultIndexClassnames =
    "absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2  border-2 rounded-full z-20  w-6 h-6 flex items-center justify-center ";

  const buttons = [
    {
      option: "A",
      opt: "opt_a",
    },
    {
      option: "B",
      opt: "opt_b",
    },
    {
      option: "C",
      opt: "opt_c",
    },
    {
      option: "D",
      opt: "opt_d",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 ">
        {buttons.map((button) => (
          <button
            onClick={() => handleClick(button.option)}
            title={question[button.opt]}
            className={`relative text-md pl-4 m-1 flex items-center border-2 border-gray h-10 text-left rounded-lg  ${
              answered
                ? optionChoosen === button.option
                  ? optionChoosen === correctOption
                    ? "text-correct ring-2 ring-correct "
                    : "text-incorrect ring-2 ring-incorrect "
                  : ""
                : "hover:bg-[#f2f2f2]"
            } ${
              answered && question.opt_correct == button.option
                ? " text-correct ring-2 ring-correct "
                : ""
            }`}
            disabled={answered}
          >
            <p className="overflow-hidden whitespace-nowrap">
              {question[button.opt]}
            </p>
            <div
              className={`absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2  border-2 rounded-full z-20  w-6 h-6 flex items-center justify-center ${
                answered
                  ? optionChoosen === button.option
                    ? optionChoosen === correctOption
                      ? "bg-correct  border-correct text-white"
                      : "bg-incorrect border-incorrect text-white"
                    : "border-gray text-gray bg-white"
                  : "border-gray text-gray bg-white"
              }  ${
                answered &&
                question.opt_correct == button.option &&
                optionChoosen != button.option
                  ? " !text-correct ring-2 ring-correct "
                  : ""
              } `}
            >
              {button.option}
            </div>
          </button>
        ))}
      </div>
      <div className="flex gap-2 justify-end">
        {quizData.currentQuestion + 1 < quizData.questions?.length && (
          <button
            onClick={handleNext}
            className="w-36 py-2 border border-white duration-300 hover:ring-2  hover:ring-primary px-4  rounded-lg  text-white bg-primary"
            disabled={isLoading}
          >
            Next
          </button>
        )}
        <button
          onClick={handleFinish}
          className="w-36 flex justify-center items-center gap-1 py-2 border border-white duration-300 hover:ring-2  hover:ring-incorrect px-4  rounded-lg  text-white bg-incorrect"
          disabled={isLoading}
        >
          {isLoading && <Spinner className="w-6" />}
          Finish
        </button>
      </div>
    </div>
  );
};

export default React.memo(AnswerList);
