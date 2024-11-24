"use client";

import React, { useState, useEffect, useContext } from "react";
import QuestionDisplay from "./components/QuestionDisplay";
import Timer from "./components/Timer";
import axios from "axios";
import { redirect, useParams, useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { ExamContext } from "@/contexts/ExamContext";
import { toast } from "react-toastify";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Component() {
  const { examData, setExamData } = useContext(ExamContext);
  const params = useParams();
  const examId = params?.examId;
  const level = params?.level || 1;
  const [questions, setQuestions] = useState(examData.questions);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(examData.time || 60);
  const [isAnswered, setIsAnswered] = useState(false);

  const router = useRouter();

  const [queryParams, setQueryParams] = useState({});

  useEffect(() => {
    // Ensure this runs only on the client side
    const params = new URLSearchParams(window.location.search);
    const queryObject = {};
    for (const [key, value] of params.entries()) {
      queryObject[key] = value;
    }
    console.log(queryObject.exam);
    setQueryParams(queryObject);
  }, []);

  useEffect(() => {
    setExamData((prev) => ({
      ...prev,
      attempts: 0,
      correct: 0,
    }));
  }, []);

  useEffect(() => {
    if (examData.isPlaying === false) {
      router.push(`/examhall/exam/${examId}/result`);
    }
  }, [examData.isPlaying, examId, router]);

  useEffect(() => {
    if (questions.length === 0) {
      router.push(`/examhall/exam/${examId}/play`);
    }
  }, [questions, examId, router]);

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
        c4 % onsole.log("Response:", response);
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
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      toast.error("Time's up!");
      router.push(`/examhall/exam/${examId}/result`);
    }
  }, [timeLeft, examId, router]);

  const handleAnswer = (isCorrect) => {
    setIsAnswered(true);

    setExamData((prev) => ({
      ...prev,
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      attempts: prev.attempts + 1,
    }));
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setIsAnswered(false);
      }
    }, 300);
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
          <Timer timeLeft={timeLeft} totalTime={examData.time || 60} />
        </div>
      </div>
      <QuestionDisplay
        question={questions[currentQuestionIndex]}
        setAnsweredTrue={handleAnswer}
        isAnswered={isAnswered}
        setIsAnswered={setIsAnswered}
      />
      <Link
        href={`/examhall/exam/${examId}/result?exam=${queryParams.exam}`}
        className="flex justify-end py-4"
      >
        <Button className="bg-red-500 hover:bg-red-400 active:bg-red-500 text-white w-32 font-semibold">
          Finish
        </Button>
      </Link>
    </div>
  );
}
