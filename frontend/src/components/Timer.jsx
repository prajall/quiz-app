"use client";
import { GameContext } from "@/contexts/GameContext";
import { TimerContext } from "@/contexts/TimerContext";
import React, { useContext, useEffect, useRef } from "react";

const Timer = () => {
  const { gameData } = useContext(GameContext);
  const { runningTimer } = useContext(TimerContext);

  return <>{gameData.isPlaying && <div>Time: {runningTimer}</div>}</>;
};

export default Timer;
