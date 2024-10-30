"use client";
import { ExamContext } from "@/contexts/ExamContext";
import React, { useContext, useEffect } from "react";
import ExamReport from "./components/ExamReport";
import LeaderboardTop3 from "./components/LeaderboardTop3";
import LeaderboardTable from "./components/LeaderboardTable";

const ResultPage = () => {
  const { examData, setExamData } = useContext(ExamContext);
  console.log("Results: ", examData);
  useEffect(() => {
    setExamData((prev) => ({ ...prev, isPlaying: false }));
  }, []);
  return (
    <div className="flex flex-col lg:flex-row gap-4 mt-4">
      <div className="report w-full lg:w-1/2">
        <ExamReport />
      </div>
      <div className="leaderboard w-full lg:w-1/2">
        <LeaderboardTop3 />
      </div>
    </div>
  );
};

export default ResultPage;
