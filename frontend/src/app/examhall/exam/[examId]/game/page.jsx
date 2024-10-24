"use client";

import React, { useState, useEffect } from "react";
import QuestionDisplay from "./components/QuestionDisplay";
import Timer from "./components/Timer";
import axios from "axios";
import { useParams } from "next/navigation";
import Spinner from "@/components/Spinner";

export default function Component() {
  const params = useParams();
  const examId = params?.examId;
  const level = params?.level || 1;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userProgress, setUserProgress] = useState({
    totalCorrect: 0,
    totalAttempts: 0,
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log("Exam ID:", examId, "Level:", level);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/question/exam/${examId}?level=${level}`,
          {
            headers: {
              etutor_id: 96712,
            },
          }
        );
        console.log("Response:", response);
        if (response.status == 200) {
          const data = response.data;
          setQuestions(data);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isAnswered]);

  const handleAnswer = (isCorrect) => {
    setIsAnswered(true);
    setUserProgress((prev) => ({
      totalCorrect: isCorrect ? prev.totalCorrect + 1 : prev.totalCorrect,
      totalAttempts: prev.totalAttempts + 1,
    }));

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setIsAnswered(false);
      } else {
        console.log("Exam completed!", userProgress);
      }
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spinner />
      </div>
    );
  }

  if (questions.length === 0) {
    return <div>No questions found</div>;
  }

  return (
    <div className=" mx-auto p-6 ">
      <div className="flex justify-between mb-6">
        <div>
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
      </div>
      <div className="relative bg-white h-10 ">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Timer timeLeft={timeLeft} totalTime={60} />
        </div>
      </div>
      <QuestionDisplay
        question={questions[currentQuestionIndex]}
        setAnsweredTrue={handleAnswer}
        isAnswered={isAnswered}
      />
      <div className="mt-4">
        Correct: {userProgress.totalCorrect} / Attempts:{" "}
        {userProgress.totalAttempts}
      </div>
    </div>
  );
}
