"use client";
import { ScoreContext } from "@/contexts/ScoreContext";
import React, { useContext, useEffect, useState } from "react";

const Score = () => {
  const { score, setScore } = useContext(ScoreContext);
  const calculateTotalScore = () => {
    let tScore = 0;
    Object.keys(score).forEach((exam_id) => {
      tScore += score[exam_id];
    });
    return tScore;
  };
  const [totalScore, setTotalScore] = useState(calculateTotalScore());

  useEffect(() => {
    setTotalScore(calculateTotalScore());
  }, [score, setScore]);

  return <div>Score: {totalScore} </div>;
};

export default Score;
