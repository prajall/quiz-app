"use client";
import { QuizContext } from "@/contexts/QuizContext";
import { ScoreContext } from "@/contexts/ScoreContext";
import { exams } from "@/examData";
import React, { useContext } from "react";

const page = () => {
  console.log("rendered quiz-end page");
  const { score } = useContext(ScoreContext);
  const { quizData } = useContext(QuizContext);

  const quizQuestions = quizData.questions;

  const filteredScores = Object.keys(score).reduce((acc, key) => {
    const examId = key;
    // const category =
    //   exams.find((exam) => exam.exam_id === examId)?.name || examId;
    const s = score[key];

    const matchedQuestion = quizQuestions.find(
      (question) => question.exam_id === examId
    );
    if (matchedQuestion) {
      acc[examId] = s;
    }

    return acc;
  }, {});

  console.log(filteredScores);

  const calculateTotalScore = () => {
    let tScore = 0;
    Object.keys(score).forEach((exam_id) => {
      tScore += score[exam_id];
    });
    return tScore;
  };

  const totalScore = calculateTotalScore();

  return (
    <div>
      <h1>QUIZ ENDED</h1>
      <p>Display score</p>
      <ul>
        {Object.keys(filteredScores).map((item, index) => (
          <li key={item} className="flex">
            <p> {exams.find((exam) => exam.exam_id === item)?.name || item}</p>
            <p>:</p>
            <p>{score[1000 + 1 + index]}</p>
          </li>
        ))}
        <li>Total: {totalScore}</li>
      </ul>
    </div>
  );
};

export default page;
