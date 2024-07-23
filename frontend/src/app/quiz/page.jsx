"use client";
import { QuizContext } from "@/contexts/QuizContext";
import { TimerContext } from "@/contexts/TimerContext";
import { exams } from "@/examData";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  console.log("Rendered Quiz Setting");
  const [examId, setExamId] = useState("all");
  const [time, setTime] = useState(60);
  const { setQuizData, resetQuizData, startQuiz } = useContext(QuizContext);
  const { startTimer, stopTimer } = useContext(TimerContext);

  const router = useRouter();

  const handleExamChange = async (event) => {
    console.log("change");
    setQuizData((prev) => ({ ...prev, currentQuestion: event.target.value }));
    setExamId(event.target.value);
  };
  const handleTimeChange = async (event) => {
    console.log("change");
    setTime(event.target.value);
  };

  const beginQuiz = async () => {
    let response;
    try {
      if (examId != "all") {
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
        <h1 className="font-semibold text-3xl text-primary lg:text-4xl ">
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
        <div className="flex gap-2 items-center">
          <p className="w-1/2">Time:</p>
          <Select
            labelId="demo-select-small-label"
            id="demo-simple-select"
            value={time}
            onChange={handleTimeChange}
            className="h-8 rounded-full"
          >
            <MenuItem className="text-sm" value={30}>
              00:30
            </MenuItem>
            <MenuItem className="text-sm" value={60}>
              1:00
            </MenuItem>
            <MenuItem className="text-sm" value={90}>
              1:30
            </MenuItem>
            <MenuItem className="text-sm" value={120}>
              2:00
            </MenuItem>
          </Select>
        </div>
        <div className="flex gap-2">
          <p className="w-1/2">Exam Category:</p>
          <Select
            labelId="demo-select-small-label"
            id="demo-simple-select"
            value={examId}
            onChange={handleExamChange}
            className="h-8 text-sm px-2 "
            sx={{ borderRadius: "30px" }}
          >
            <MenuItem className="text-sm" value="all" key="random">
              Random
            </MenuItem>
            {exams.map((exam) => (
              <MenuItem
                className="text-sm"
                value={exam.exam_id}
                key={exam.exam_id}
              >
                {exam.name}
              </MenuItem>
            ))}
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
