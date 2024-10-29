"use client";

import { useContext, useEffect, useState } from "react";
import LevelComponent from "./components/LevelComponent";
import LevelSkeleton from "@/components/LevelSkeleton";
import axios from "axios";
import { AppContext } from "@/contexts/AppContext";
import { ExamContext } from "@/contexts/ExamContext";
import { useSearchParams } from "next/navigation";

export default function ExamPage({ params }) {
  const { appData } = useContext(AppContext);
  const { setExamData } = useContext(ExamContext);
  const [isLoading, setIsLoading] = useState(true);
  const { examId } = params;
  const [levels, setLevels] = useState([]);

  const searchParams = useSearchParams();

  const examTitle = searchParams.get("exam");

  const getLevels = async () => {
    try {
      console.log("User:", appData.user);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/gamedata/levels?examId=${examId}`,
        { withCredentials: true, headers: { etutor_id: appData.user?.id } }
      );
      console.log("Exam Levels:", response);
      if (response.status === 200) {
        setLevels(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (appData.user) {
      getLevels();
    }
  }, [appData.user]);

  useEffect(() => {
    getLevels();
    setExamData((prev) => ({ ...prev, level: null }));
  }, []);

  return (
    <>
      <div className="mt-4">
        <p className="font-semibold">
          Exam:{" "}
          <span className="text-lg"> {examTitle ? examTitle : "Exam"}</span>{" "}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
        {isLoading
          ? Array.from({ length: 15 }).map((_, index) => (
              <LevelSkeleton key={index} />
            ))
          : levels.map((level) => (
              <LevelComponent
                level={level}
                key={level._id}
                examTitle={examTitle}
              />
            ))}
      </div>
    </>
  );
}
