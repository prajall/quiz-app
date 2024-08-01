"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";

const defaultScore = {
  1001: 0,
  1002: 0,
  1003: 0,
  1004: 0,
  1005: 0,
  1006: 0,
  1007: 0,
  1008: 0,
  1009: 0,
  1010: 0,
};

export const ScoreContext = createContext(defaultScore);

const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(defaultScore);

  const incrementScore = (exam_id) => {
    setScore((prev) => ({ ...prev, [exam_id]: prev[exam_id] + 1 }));
  };

  const resetScore = () => {
    setScore(defaultScore);
  };

  const uploadScore = async () => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/score`,
        { score },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      if (error.message == "Network Error") {
        toast.error("Error Connecting to the Server");
        return;
      }
      if (error.response.data) {
        toast.error(error.response.data);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <ScoreContext.Provider
      value={{ score, setScore, incrementScore, uploadScore, resetScore }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export default ScoreProvider;
