"use client";
import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import { GameContext } from "./GameContext";

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const { gameData, setGameData } = useContext(GameContext);
  const [runningTimer, setRunningTimer] = useState(0);
  const timerRef = useRef(null);

  const startTimer = (maxTimer) => {
    setRunningTimer(maxTimer);
    setGameData({ ...gameData, isPlaying: true });
    timerRef.current = setInterval(() => {
      setRunningTimer((prev) => prev - 1);
    }, 1000);
  };

  const stopTimer = () => {
    setGameData({ ...gameData, isPlaying: false });
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    if (runningTimer <= 0) {
      stopTimer();
    }
  }, [runningTimer]);

  useEffect(() => {
    if (!gameData.isPlaying) {
      stopTimer();
    }
  }, [gameData.isPlaying]);

  return (
    <TimerContext.Provider
      value={{
        runningTimer,
        startTimer,
        stopTimer,
        setRunningTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
