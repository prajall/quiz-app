"use client";
import MinuteSecond from "@/components/MinuteSecond";
import { QuizContext } from "@/contexts/QuizContext";
import { TimerContext } from "@/contexts/TimerContext";
import React, { useContext, useEffect, useRef } from "react";
import { toast } from "react-toastify";

const Timer = () => {
  const { quizData, endQuiz } = useContext(QuizContext);
  const { runningTimer } = useContext(TimerContext);

  useEffect(() => {
    if (quizData.isPlaying && runningTimer <= 0) {
      toast.info("Times Up !!");
      endQuiz();
    }
  }, [runningTimer]);

  return (
    <>
      {/* {quizData.isPlaying && ( */}
      <div className="font-semibold text-md text-center mx-auto flex gap-1 w-fit text-black">
        <span>Time: </span>{" "}
        <span className="font-semibold">
          <MinuteSecond time={runningTimer} />
        </span>
      </div>
      {/* )} */}
    </>
  );
};

export default Timer;
