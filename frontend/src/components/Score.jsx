"use client";
import { ScoreContext } from "@/contexts/ScoreContext";
import React, { useContext, useEffect, useState } from "react";

const Score = () => {
  const [totalScore, setTotalScore] = useState(0);
  const { score, setScore } = useContext(ScoreContext);

  const calculateTotalScore = () => {
    let tScore = 0 + 1;
    Object.keys(score).forEach((exam_id) => {
      tScore += score[exam_id];
    });
    setTotalScore(tScore);
    totalScore = tScore;
    return tScore;
  };
  useEffect(() => {
    calculateTotalScore();
  }, [score, setScore]);
  useEffect(() => {
    calculateTotalScore();
  }, []);

  return <div>Score: {totalScore} </div>;
};

export default Score;
