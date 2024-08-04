"use client";
import Spinner from "@/components/Spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { AppContext } from "@/contexts/AppContext";
import { QuizContext } from "@/contexts/QuizContext";
import { ScoreContext } from "@/contexts/ScoreContext";
import { TimerContext } from "@/contexts/TimerContext";
import { examIdToName, exams } from "@/examData";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  console.log("Rendered Quiz Setting");
  const { quizData, setQuizData, resetQuizData, startQuiz } =
    useContext(QuizContext);
  const { startTimer, stopTimer } = useContext(TimerContext);
  const { resetScore } = useContext(ScoreContext);
  const { appData } = useContext(AppContext);
  const [examId, setExamId] = useState(quizData.currentExam);
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState(quizData.quizSettings.time);
  const [questionLength, setQuestionsLength] = useState(
    quizData.quizSettings.questionLength
  );

  const router = useRouter();

  const handleExamChange = async (value) => {
    setQuizData((prev) => ({ ...prev, currentQuestion: value }));
    setExamId(value);
  };

  const beginQuiz = async () => {
    setIsLoading(true);
    let response;
    try {
      if (examId != "All") {
        response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/question/exam/${examId}?limit=${questionLength}`
        );
      } else {
        response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/question/random?limit=${questionLength}`
        );
      }
      console.log(response);
      if (!response.data) {
        toast.error("Error Getting Questions");
        return;
      }
      if (response.status == 200) {
        setQuizData((prev) => ({ ...prev, questions: response?.data }));
        setQuizData((prev) => ({
          ...prev,
          currentExam: examId,
          quizSettings: {
            ...prev.quizSettings,
            time: time,
            questionLength: questionLength,
          },
        }));
        startTimer(time);
        startQuiz();
        console.log("Data before redirecting:", response);
        router.push(`/quiz/${response?.data[0]?._id}`);
      } else {
        toast.error("Something Went Wrong");
      }
    } catch (error) {
      if (error.message == "Network Error") {
        toast.error("Error Connecting to the Server");
        return;
      }
      if (error.response.data) {
        toast.error(error.response.data);
      } else {
        toast.error("Something went wrong");
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    resetQuizData();
    stopTimer();
    resetScore();
  }, []);

  useEffect(() => {
    if (!appData.user) {
      console.log("redirecting from context");
      redirect("/login");
    }
  }, []);

  return (
    <div className="h-[80vh] flex flex-col items-center justify-center space-y-6 text-black">
      <div className="space-y-1">
        <h1 className="font-semibold text-2xl text-primary text-center lg:text-4xl ">
          Welcome To Quiz Pro
        </h1>
        <p className="opacity-90 text-sm text-center">
          Challenge yourself to the game of quiz. Select topic and compete
          against the time.
        </p>
      </div>
      <div className="space-y-6 rounded-xl w-full max-w-[500px] border p-4  md:p-6 shadow-sm shadow-black mx-auto ">
        <h2 className="mb-8 text-2xl text-center font-semibold">
          Choose your Quiz Settings
        </h2>
        <div className="flex justify-between gap-2 items-center">
          <p className="w-1/2">Time:</p>
          <Select
            value={time}
            onValueChange={(value) => setTime(value)}
            className=""
          >
            <SelectTrigger className="w-32">
              {time ? time : "60"}s
            </SelectTrigger>
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
        <div className="flex justify-between gap-2 items-center">
          <p className="w-1/2">Number of Questions:</p>
          <Select
            value={questionLength}
            onValueChange={(value) => setQuestionsLength(value)}
          >
            <SelectTrigger className="w-32">
              {questionLength ? questionLength : 10}
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="text-sm" value={10}>
                10
              </SelectItem>
              <SelectItem className="text-sm" value={20}>
                20
              </SelectItem>
              <SelectItem className="text-sm" value={30}>
                30
              </SelectItem>
              <SelectItem className="text-sm" value={40}>
                40
              </SelectItem>
              <SelectItem className="text-sm" value={50}>
                50
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <button
          onClick={beginQuiz}
          className=" text-center flex ml-auto disabled:hover:ring-0 disabled:bg-opacity-80 gap-1 items-center text-sm py-2 border border-white duration-300 hover:ring-2  hover:ring-primary px-4  rounded-lg  text-white bg-primary"
          disabled={isLoading}
        >
          {isLoading && <Spinner className="w-6" />}
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default page;
