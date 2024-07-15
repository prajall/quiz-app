"use client";
import { questions } from "@/questions";
import React, { useContext, useState } from "react";
import { createContext } from "react";

const defaultGameData = {
  isPlaying: false,
  questions: questions,
  currentQuestion: 0,
};

export const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [gameData, setGameData] = useState(defaultGameData);

  const resetGameData = () => {
    setGameData(defaultGameData);
  };

  const endGame = async () => {
    //make api call
  };

  return (
    <GameContext.Provider value={{ gameData, setGameData, resetGameData }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
