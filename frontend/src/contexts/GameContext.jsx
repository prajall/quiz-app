"use client";
import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { TimerContext } from "./TimerContext";
import { useRouter } from "next/navigation";
import { ScoreContext } from "./ScoreContext";

const defaultGameData = {
  isPlaying: false,
  questions: [],
  currentQuestion: 0,
};

export const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [gameData, setGameData] = useState(defaultGameData);
  const { uploadScore } = useContext(ScoreContext);

  const router = useRouter();

  const resetGameData = () => {
    setGameData(defaultGameData);
  };

  const startGame = (maxTimer) => {
    setGameData((prev) => ({ ...prev, isPlaying: true }));
  };

  const endGame = async () => {
    setGameData((prev) => ({ ...prev, isPlaying: false }));
    alert("Game ended");
    await uploadScore();
    router.push("/game-end");
  };

  useEffect(() => {
    console.log("gameData Updated: ", gameData);
  }, [gameData, setGameData]);

  return (
    <GameContext.Provider
      value={{ gameData, setGameData, resetGameData, endGame, startGame }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
