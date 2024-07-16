"use client";
import { GameContext } from "@/contexts/GameContext";
import { TimerContext } from "@/contexts/TimerContext";
import React, { useContext, useEffect, useRef } from "react";

const Timer = () => {
  const { gameData, endGame } = useContext(GameContext);
  const { runningTimer } = useContext(TimerContext);

  useEffect(() => {
    if (gameData.isPlaying && runningTimer <= 0) {
      endGame();
    }
  }, [runningTimer]);

  // return <>{gameData.isPlaying && <div>Time: {runningTimer}</div>}</>;
  return (
    <>
      <div>Time: {runningTimer}</div>
    </>
  );
};

export default Timer;
