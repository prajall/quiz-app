"use client";
import { GameContext } from "@/contexts/GameContext";
import React, { useContext, useState } from "react";

const AnswerList = ({ question }) => {
  const { gameData, setGameData } = useContext(GameContext);
  console.log(gameData);
  const [answered, setAnswered] = useState(false);
  const [optionChoosen, setOptionChoosen] = useState(null);
  const [correctAnswerChoosen, setCorrectAnswerChoosen] = useState(false);

  const handleClick = (option) => {
    setAnswered(true);
    setOptionChoosen(option);
    if (question.opt_correct === option) {
      setCorrectAnswerChoosen(true);
      setGameData({ ...gameData, score: gameData.score + 1 });
      console.log(gameData);
    } else setCorrectAnswerChoosen(false);
  };

  return (
    <div>
      <button
        onClick={() => handleClick("A")}
        className={
          answered
            ? optionChoosen === "A"
              ? correctAnswerChoosen
                ? "bg-green-500"
                : "bg-red-500"
              : ""
            : ""
        }
        disabled={answered}
      >
        {question.opt_a}
      </button>
      <button
        onClick={() => handleClick("B")}
        className={
          answered
            ? optionChoosen === "B"
              ? correctAnswerChoosen
                ? "bg-green-500"
                : "bg-red-500"
              : ""
            : ""
        }
        disabled={answered}
      >
        {question.opt_b}
      </button>
      <button
        onClick={() => handleClick("C")}
        className={
          answered
            ? optionChoosen === "C"
              ? correctAnswerChoosen
                ? "bg-green-500"
                : "bg-red-500"
              : ""
            : ""
        }
        disabled={answered}
      >
        {question.opt_c}
      </button>
      <button
        onClick={() => handleClick("D")}
        className={
          answered
            ? optionChoosen === "D"
              ? correctAnswerChoosen
                ? "bg-green-500"
                : "bg-red-500"
              : ""
            : ""
        }
        disabled={answered}
      >
        {question.opt_d}
      </button>
    </div>
  );
};

export default AnswerList;
