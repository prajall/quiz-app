"use client";
import { GameContext } from "@/contexts/GameContext";
import { TimerContext } from "@/contexts/TimerContext";
import { exams } from "@/examData";
import { MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const QuizSettings = () => {
  console.log("Rendered Quiz Setting");
  const [examId, setExamId] = useState("random");
  const { gameData, setGameData, resetGameData } = useContext(GameContext);
  const { startTimer } = useContext(TimerContext);
  const [isloading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChange = async (event) => {
    console.log("change");
    setExamId(event.target.value);
  };

  const startQuiz = async () => {
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
      setGameData((prev) => ({ ...prev, questions: response?.data }));
    } catch (error) {
      console.log(error);
    }
    startTimer(120);
    router.push(`/game/${response.data[0]?._id}`);
  };

  useEffect(() => {
    resetGameData();
  }, []);

  return (
    <div>
      <h2>Quiz settings:</h2>
      <p>Time: 2 minutes</p>
      <p>Choose your Exam:</p>
      <Select
        labelId="demo-select-small-label"
        id="demo-simple-select"
        value={examId}
        label="Exam Id"
        onChange={handleChange}
        className="text-black"
      >
        {exams.map((exam) => (
          <MenuItem value={exam.exam_id} key={exam.exam_id}>
            {exam.name}
          </MenuItem>
        ))}
      </Select>
      <button onClick={startQuiz}>start</button>
    </div>
  );
};

export default QuizSettings;
