"use client";
import { Progress } from "@/components/ui/progress";
import { QuizContext } from "@/contexts/QuizContext";
import { LinearProgress } from "@mui/material";
import { linearProgressClasses } from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { useContext } from "react";

const ProgressBar = () => {
  const { quizData } = useContext(QuizContext);

  return (
    <div className="w-full">
      <p className="mb-1">
        Question:{" "}
        <span>
          {quizData.currentQuestion + 1}/{quizData.questions.length}
        </span>
      </p>
      {/* <LinearProgress
        variant="determinate"
        value={
          Math.floor(
            ((quizData.currentQuestion + 1) / quizData.questions.length) * 100
          ) || 0
        }
        sx={{
          borderRadius: "5px",
          height: 6,
          [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: "#d9d9d9",
          },
          [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: "#284b63",
          },
        }}
      /> */}
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
