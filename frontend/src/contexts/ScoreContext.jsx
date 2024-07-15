"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";

const defaultScore = {
  1001: 0,
  1002: 0,
  1003: 2,
  1004: 0,
  1005: 0,
  1006: 0,
  1007: 0,
  1008: 0,
  1009: 3,
  1010: 0,
};

export const ScoreContext = createContext();

const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(defaultScore);

  const incrementScore = (exam_id) => {
    setScore((prev) => ({ ...prev, [exam_id]: prev[exam_id] + 1 }));
    setScore((prev) => ({ ...prev, total: prev.total + 1 }));
  };

  const uploadScore = async (userId) => {
    console.log("Uploading Score");
    try {
      console.log(score);
      const response = await axios.patch(
        `http://localhost:3001/score/user/6694fba04ab01d7f5efcc98d`,
        { score },
        {
          headers: {
            "Content-Type": "application/json",
          },
          // withCredentials: true,
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
