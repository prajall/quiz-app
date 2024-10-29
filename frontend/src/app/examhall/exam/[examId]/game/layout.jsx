"use client";
import { ExamContext } from "@/contexts/ExamContext";
import { redirect, useSearchParams } from "next/navigation";
import React, { useContext } from "react";

const ExamGameLayout = ({ children, params }) => {
  const { examData } = useContext(ExamContext);
  const searchParams = useSearchParams();
  const examTitle = searchParams.get("exam");
  const examId = params.examId;

  if (!examData.isPlaying) {
    redirect(`/examhall/exam/${examId}?exam=${examTitle}`);
  }

  return children;
};

export default ExamGameLayout;
