"use client";
import React, { useContext, useState } from "react";
import { createContext } from "react";

const defaultGameData = {
  time: 0,
  score: 0,
  questions: [],
};

export const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [gameData, setGameData] = useState(defaultGameData);

  return (
    <GameContext.Provider value={{ gameData, setGameData }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
