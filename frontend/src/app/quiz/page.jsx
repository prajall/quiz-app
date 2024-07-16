"use client";
import { QuizContext } from "@/contexts/QuizContext";
import { TimerContext } from "@/contexts/TimerContext";
import { exams } from "@/examData";
import { MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const page = () => {
  console.log("Rendered Quiz Setting");
  const [examId, setExamId] = useState("random");
  const [time, setTime] = useState(60);
  const { setQuizData, resetQuizData, startQuiz } = useContext(QuizContext);
  const { startTimer, stopTimer } = useContext(TimerContext);

  const router = useRouter();

  const handleExamChange = async (event) => {
    console.log("change");
    setExamId(event.target.value);
  };
  const handleTimeChange = async (event) => {
    console.log("change");
    setTime(event.target.value);
  };

  const beginQuiz = async () => {
    let response;
    try {
      if (examId != "random") {
        response = await axios.get(
          `http://localhost:3001/question/exam/${examId}?limit=10`
        );
      } else {
        response = await axios.get(
          `http://localhost:3001/question/random?limit=10`
        );
      }
      setQuizData((prev) => ({ ...prev, questions: response?.data }));
    } catch (error) {
      console.log(error);
    }
    startTimer(120);
    startQuiz(time);
    router.push(`/quiz/${response.data[0]?._id}`);
  };

  useEffect(() => {
    resetQuizData();
    stopTimer();
    //todo: reset score
  }, []);

  return (
    <div>
      <h2>Quiz settings:</h2>
      <p>Time:</p>
      <Select
        labelId="demo-select-small-label"
        id="demo-simple-select"
        value={time}
        label="Time"
        onChange={handleTimeChange}
        className="text-black"
      >
        <MenuItem value={30}>00:30</MenuItem>
        <MenuItem value={60}>1:00</MenuItem>
        <MenuItem value={90}>1:30</MenuItem>
        <MenuItem value={120}>2:00</MenuItem>
      </Select>
      <p>Choose your Exam:</p>
      <Select
        labelId="demo-select-small-label"
        id="demo-simple-select"
        value={examId}
        label="Exam Id"
        onChange={handleExamChange}
        className="text-black"
      >
        {exams.map((exam) => (
          <MenuItem value={exam.exam_id} key={exam.exam_id}>
            {exam.name}
          </MenuItem>
        ))}
      </Select>
      <button onClick={beginQuiz}>start</button>
    </div>
  );
};

export default page;
