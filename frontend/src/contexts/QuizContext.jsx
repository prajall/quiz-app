"use client";
import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { TimerContext } from "./TimerContext";
import { useRouter } from "next/navigation";
import { ScoreContext } from "./ScoreContext";

const defaultQuizData = {
  isPlaying: false,
  questions: [],
  currentQuestion: 0,
  currentExam: "All",
};

export const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const [quizData, setQuizData] = useState(defaultQuizData);
  const { uploadScore } = useContext(ScoreContext);

  const router = useRouter();

  const resetQuizData = () => {
    setQuizData(defaultQuizData);
  };

  const startQuiz = () => {
    setQuizData((prev) => ({ ...prev, isPlaying: true }));
  };

  const endQuiz = async () => {
    setQuizData((prev) => ({ ...prev, isPlaying: false }));
    // alert("Quiz ended");
    await uploadScore();
    router.push("/quiz-end");
  };

  useEffect(() => {
    console.log("quizData Updated: ", quizData);
  }, [quizData, setQuizData]);

  return (
    <QuizContext.Provider
      value={{ quizData, setQuizData, resetQuizData, endQuiz, startQuiz }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
