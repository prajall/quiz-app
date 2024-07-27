"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { QuizContext } from "@/contexts/QuizContext";
import { TimerContext } from "@/contexts/TimerContext";
import { examIdToName, exams } from "@/examData";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  console.log("Rendered Quiz Setting");
  const [examId, setExamId] = useState("All");
  const [time, setTime] = useState(60);
  const { setQuizData, resetQuizData, startQuiz } = useContext(QuizContext);
  const { startTimer, stopTimer } = useContext(TimerContext);

  const router = useRouter();

  const handleExamChange = async (value) => {
    setQuizData((prev) => ({ ...prev, currentQuestion: value }));
    setExamId(value);
  };

  const beginQuiz = async () => {
    let response;
    try {
      if (examId != "All") {
        response = await axios.get(
          `http://localhost:3001/question/exam/${examId}?limit=10`
        );
      } else {
        response = await axios.get(
          `http://localhost:3001/question/random?limit=10`
        );
      }
      if (!response.data) {
        toast.error("Error Getting Questions");
        return;
      }
      if (response.status == 200) {
        setQuizData((prev) => ({ ...prev, questions: response?.data }));
      } else {
        toast.error("Something Went Wrong");
      }
    } catch (error) {
      console.log(error);
    }
    startTimer(120);
    startQuiz(time);
    router.push(`/quiz/${response?.data[0]?._id}`);
  };

  useEffect(() => {
    resetQuizData();
    stopTimer();
    //todo: reset score
  }, []);

  return (
    <div className="mt-4 space-y-6 text-black">
      <div className="space-y-1">
        <h1 className="font-semibold text-2xl text-primary text-center lg:text-4xl ">
          Welcome To Quiz Pro
        </h1>
        {/* <p className="opacity-90 text-sm">
          This is a game of quiz with questions from different categories like
          TSC, Loksewa, GK, etc.
        </p> */}
      </div>
      <div className="space-y-6 rounded-xl max-w-96 border p-4 md:p-6 shadow-sm shadow-black mx-auto ">
        <h2 className="mb-8 text-2xl font-semibold">
          Choose your Quiz Settings
        </h2>
        <div className="flex justify-between gap-2 items-center">
          <p className="w-1/2">Time:</p>
          <Select
            value={time}
            onValueChange={(value) => setTime(value)}
            className=""
          >
            <SelectTrigger className="w-32">{time}</SelectTrigger>
            <SelectContent>
              <SelectItem className="text-sm" value={30}>
                00:30
              </SelectItem>
              <SelectItem className="text-sm" value={60}>
                1:00
              </SelectItem>
              <SelectItem className="text-sm" value={90}>
                1:30
              </SelectItem>
              <SelectItem className="text-sm" value={120}>
                2:00
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="w-1/2">Exam Category:</p>
          <Select
            value={examId}
            onValueChange={handleExamChange}
            className="h-8 text-sm px-2 "
          >
            <SelectTrigger className="w-32">
              {" "}
              {examIdToName(examId)}{" "}
            </SelectTrigger>

            <SelectContent>
              <SelectItem className="text-sm" value="All" key="random">
                All
              </SelectItem>
              {exams.map((exam) => (
                <SelectItem
                  className="text-sm"
                  value={exam.exam_id}
                  key={exam.exam_id}
                >
                  {exam.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <button
          onClick={beginQuiz}
          className="w-28 text-sm py-2 border border-white duration-300 hover:ring-2  hover:ring-primary px-4  rounded-lg  text-white bg-primary"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default page;
