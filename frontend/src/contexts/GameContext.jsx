"use client";
import React, { useContext, useState } from "react";
import { createContext } from "react";

const defaultGameData = {
  isPlaying: false,
  score: {
    1001: 0,
    1002: 0,
    1003: 0,
    1004: 0,
    1005: 0,
    1006: 0,
    1007: 0,
    1008: 0,
    1009: 0,
    10010: 0,
  },
  questions: [],
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
