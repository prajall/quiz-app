"use client";
import { QuizContext } from "@/contexts/QuizContext";
import { TimerContext } from "@/contexts/TimerContext";
import React, { useContext, useEffect, useRef } from "react";

const Timer = () => {
  const { quizData, endQuiz } = useContext(QuizContext);
  const { runningTimer } = useContext(TimerContext);

  useEffect(() => {
    if (quizData.isPlaying && runningTimer <= 0) {
      endQuiz();
    }
  }, [runningTimer]);

  return (
    <>
      {quizData.isPlaying && (
        <div className="font-semibold text-center text-black">
          Time: <span className="text-lg text-primary">{runningTimer}</span>
        </div>
      )}
    </>
  );
};

export default Timer;
