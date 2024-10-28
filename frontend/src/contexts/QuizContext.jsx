"use client";
import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { TimerContext } from "./TimerContext";
import { redirect, useRouter } from "next/navigation";
import { ScoreContext } from "./ScoreContext";

const defaultQuizData = {
  isPlaying: false,
  questions: [],
  currentQuestion: 0,
  currentExam: "All",
  correct: 0,
  incorrect: 0,
  quizSettings: { time: 120, questionLength: 20 },
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
    await uploadScore();
    router.push("/quiz-end");
  };

  useEffect(() => {}, [quizData]);

  return (
    <QuizContext.Provider
      value={{ quizData, setQuizData, resetQuizData, endQuiz, startQuiz }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
