"use client";
import { GameContext } from "@/contexts/GameContext";
import React, { useContext, useEffect } from "react";

const Timer = ({ maxTime }) => {
  const { gameData, setGameData } = useContext(GameContext);

  useEffect(() => {
    // Initialize the timer with maxTime
    setGameData((prev) => ({ ...prev, time: maxTime }));

    const interval = setInterval(() => {
      setGameData((prev) => {
        if (prev.time <= 0) {
          clearInterval(interval);
          return prev;
        }
        return { ...prev, time: prev.time - 1000 };
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [maxTime, setGameData]);

  return <div>{gameData.time / 1000}</div>;
};

export default Timer;
