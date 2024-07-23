"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";

const defaultScore = {
  1001: 0,
  1002: 3,
  1003: 0,
  1004: 2,
  1005: 0,
  1006: 2,
  1007: 0,
  1008: 1,
  1009: 0,
  1010: 0,
};

export const ScoreContext = createContext(defaultScore);

const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(defaultScore);

  const incrementScore = (exam_id) => {
    setScore((prev) => ({ ...prev, [exam_id]: prev[exam_id] + 1 }));
  };

  const uploadScore = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/score`,
        { score },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(score);
  }, [score, setScore]);

  return (
    <ScoreContext.Provider
      value={{ score, setScore, incrementScore, uploadScore }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export default ScoreProvider;
