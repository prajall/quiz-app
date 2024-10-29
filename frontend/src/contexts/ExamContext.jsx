"use client";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const defaultExamData = {
  isLoading: false,
  questions: [],
  isPlaying: false,
  level: null,
  attempts: 0,
  correct: 0,
  examTitle: "",
  time: 0,
  gameMode: "normal",
};

export const ExamContext = createContext(defaultExamData);

const ExamProvider = ({ children }) => {
  const [examData, setExamData] = useState(defaultExamData);

  useEffect(() => {
    console.log("Examdata updated:", examData);
  }, [examData]);

  return (
    <ExamContext.Provider value={{ examData, setExamData }}>
      {children}
    </ExamContext.Provider>
  );
};

export default ExamProvider;
