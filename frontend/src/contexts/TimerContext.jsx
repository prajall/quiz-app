"use client";
import React, { createContext, useState, useRef, useEffect } from "react";

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [runningTimer, setRunningTimer] = useState(0);
  const timerRef = useRef(null);

  const startTimer = (maxTimer) => {
    setRunningTimer(maxTimer);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setRunningTimer((prev) => {
        if (prev <= 0) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (runningTimer >= 0) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setRunningTimer(0);
    }
  };

  useEffect(() => {
    if (runningTimer <= 0) {
      stopTimer();
    }
  }, [runningTimer]);

  return (
    <TimerContext.Provider
      value={{
        runningTimer,
        startTimer,
        stopTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
