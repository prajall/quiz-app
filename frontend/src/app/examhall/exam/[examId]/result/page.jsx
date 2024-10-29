"use client";
import { ExamContext } from "@/contexts/ExamContext";
import React, { useContext } from "react";

const ResultPage = () => {
  const { examData } = useContext(ExamContext);
  console.log("Results: ", examData);
  return (
    <div>
      <h1>Result</h1>
    </div>
  );
};

export default ResultPage;
