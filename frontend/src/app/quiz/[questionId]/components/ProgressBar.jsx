"use client";
import { Progress } from "@/components/ui/progress";
import { QuizContext } from "@/contexts/QuizContext";
import { useContext } from "react";

const ProgressBar = () => {
  const { quizData } = useContext(QuizContext);

  return (
    <div className="w-full mt-10">
      <p className="mb-1">
        Question:{" "}
        <span>
          {quizData.currentQuestion + 1}/{quizData.questions.length}
        </span>
      </p>

      <Progress
        className="h-1 bg-gray "
        value={
          Math.floor(
            ((quizData.currentQuestion + 1) / quizData.questions.length) * 100
          ) || 0
        }
      />
    </div>
  );
};

export default ProgressBar;
