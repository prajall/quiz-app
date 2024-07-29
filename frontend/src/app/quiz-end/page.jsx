"use client";
import { QuizContext } from "@/contexts/QuizContext";
import { ScoreContext } from "@/contexts/ScoreContext";
import { examIdToName, exams } from "@/examData";
import React, { useContext, useEffect, useState } from "react";
import { Gauge } from "@mui/x-charts/Gauge";
import LeaderboardTable from "../leaderboard/components/LeaderboardTable";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const page = () => {
  const [currentLeaderboard, setCurrentLeaderboard] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  console.log("rendered quiz-end page");
  const { score } = useContext(ScoreContext);
  const { quizData } = useContext(QuizContext);

  const quizQuestions = quizData.questions;

  const filteredScores = Object.keys(score).reduce((acc, key) => {
    const examId = key;
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

  const fetchLeaderboard = async () => {
    let response;
    try {
      setIsFetching(true);
      if (quizData.currentExam === "All") {
        response = await axios.get("http://localhost:3001/leaderboard", {
          headers: {
            apiKey: 123456789,
          },
        });
      } else {
        response = await axios.get(
          `http://localhost:3001/leaderboard/exam/${quizData.currentExam}`,
          {
            headers: {
              apiKey: 123456789,
            },
          }
        );
      }
      if (response.status == 200) {
        setCurrentLeaderboard(response.data.concat(response.data));
        console.log(response.data);
      } else {
        toast.error("Failed to load Leaderboard");
      }
    } catch (err) {
      console.log("Leaderboard Fetching error.", err);
      if (err.response) {
        toast.error(err.response?.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="lg:text-lg mx-auto">
      {/* headers */}
      <div className="my-6 border-b border-gray pb-2">
        <h2 className="text-2xl font-semibold text-primary  ">Quiz Ended</h2>
      </div>

      <section className="md:flex">
        <div className="md:w-1/2 md:hidden flex flex-col ">
          <p className="font-semibold mb-3  text-xl text-center">
            Correctly Answered:
          </p>
          <Gauge
            width={250}
            height={250}
            cornerRadius="50%"
            text={`${totalScore}/${quizData.questions.length}`}
            value={totalScore || 0}
            valueMin={0}
            valueMax={quizData.questions?.length}
            className="mx-auto"
          />
        </div>

        <div className=" md:w-1/2 mt-6 md:mt-0 ">
          <p className="font-semibold mb-3  text-xl text-center">
            Your Final Score:
          </p>
          <ul className="py-2 max-w-[400px] mx-auto">
            {Object.keys(filteredScores).map((item, index) => (
              <li
                key={item}
                className="flex justify-between p-2 hover:bg-gray/20 duration-300"
              >
                <p>{examIdToName(item)} :</p>
                <p>{score[1000 + 1 + index]}</p>
              </li>
            ))}
            <li className="flex justify-between p-2 mt-1 text-primary font-semibold text-xl rounded-lg">
              <p>Total:</p>
              <p>{totalScore}</p>
            </li>
          </ul>
        </div>

        <div className="md:w-1/2 hidden md:flex flex-col ">
          <p className="font-semibold mb-3  text-xl text-center">
            Correctly Answered:
          </p>
          <Gauge
            width={250}
            height={250}
            cornerRadius="50%"
            text={`${totalScore}/${quizData.questions.length}`}
            value={totalScore || 0}
            valueMin={0}
            valueMax={quizData.questions?.length}
            className="mx-auto"
          />
        </div>
      </section>

      <section className="max-w-screen-lg my-4 mt-6 mx-auto">
        <div className="flex gap-2 items-center  ">
          <p className="font-semibold  text-xl ">
            {examIdToName(quizData.currentExam)} leaderboard
          </p>
          <Link
            href={"/leaderboard"}
            className="text-xs flex gap-1 items-end text-secondary hover:border-b border-primary"
          >
            Full Leaderboard <ExternalLink size={15} />
          </Link>
        </div>
        <LeaderboardTable
          leaderboard={currentLeaderboard}
          isFetching={isFetching}
          startFrom={1}
        />
      </section>
    </div>
  );
};

export default page;
