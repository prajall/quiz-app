"use client";
import { GameContext } from "@/contexts/GameContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const AnswerList = ({ question }) => {
  console.log("Rendered AnswerList");
  const { gameData, setGameData } = useContext(GameContext);
  const [answered, setAnswered] = useState(false);
  const [optionChoosen, setOptionChoosen] = useState(null);
  const [correctAnswerChoosen, setCorrectAnswerChoosen] = useState(false);

  const router = useRouter();

  const handleClick = (option) => {
    setAnswered(true);
    setOptionChoosen(option);
    if (question.opt_correct === option) {
      setCorrectAnswerChoosen(true);
      setGameData({ ...gameData, score: gameData.score + 1 });
      console.log(gameData);
    } else setCorrectAnswerChoosen(false);

    setTimeout(() => {
      setGameData({
        ...gameData,
        currentQuestion: gameData.currentQuestion + 1,
      });
      if (gameData.currentQuestion >= gameData.questions.length) {
        alert("Game ended");
        router.push(`/game/`);
        return;
      }
      router.push(`/game/${gameData.questions[gameData.currentQuestion]._id}`);
    }, 1000);
  };

  useEffect(() => {
    setGameData({ ...gameData, currentQuestion: gameData.currentQuestion + 1 });
  }, []);
  return (
    <div>
      <button
        onClick={() => handleClick("A")}
        className={` py-1 px-4 m-1 border border-gray-400 rounded ${
          answered
            ? optionChoosen === "A"
              ? correctAnswerChoosen
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
              ? correctAnswerChoosen
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
              ? correctAnswerChoosen
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
              ? correctAnswerChoosen
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
    </div>
  );
};

export default React.memo(AnswerList);
