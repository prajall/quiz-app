"use client";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import Top3 from "./components/Top3";
// import ExamTable from "./components/ExamTable";
import OverallTable from "./components/OverallTable";
import ExamTable from "./components/ExamTable";
import SwitchableComponent from "./components/Switch";

const LeaderboardPage = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [overallLeaderboard, setOverallLeaderboard] = useState([]);
  const [examsLeaderboard, setExamsLeaderboard] = useState([]);

  const fetchOverallLeaderboard = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get("http://localhost:3001/leaderboard", {
        headers: {
          apiKey: 123456789,
        },
      });
      if (response.status == 200) {
        setOverallLeaderboard(response.data.concat(response.data));
        setLeaderboard(response.data.concat(response.data));
        // console.log(response.data);
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

  const fetchExamsLeaderboard = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(
        "http://localhost:3001/leaderboard/allexams",
        {
          headers: {
            apiKey: 123456789,
          },
        }
      );
      if (response.status == 200) {
        setExamsLeaderboard(response.data.concat(response.data));
        // console.log("ExamsLeaderboard:", response.data);
      } else {
        toast.error("Failed to load Leaderboard");
      }
    } catch (err) {
      console.log("Leaderboard Fetching error.", err);
      if (err.response) {
        toast.error(err.response?.message);
      } else if (err.message) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchOverallLeaderboard();
    fetchExamsLeaderboard();
  }, []);

  const onChangeSelected = (selected) => {
    console.log(selected);
    if (selected === "Overall") {
      setLeaderboard(overallLeaderboard);
    } else {
      setLeaderboard(examsLeaderboard[0]?.leaderboard);
      return;
    }
  };
  const onChangeSelectedExam = (selectedExam) => {
    console.log(selectedExam);
    setLeaderboard(examsLeaderboard[selectedExam]?.leaderboard);
  };

  useEffect(() => {
    console.log(leaderboard);
  }, [leaderboard]);
  return (
    <div className="mt-4 ">
      <header className="py-2 max-w-screen-lg mx-auto md:flex justify-between">
        <h1 className="text-2xl font-semibold text-primary text-center ">
          Leaderboard
        </h1>
        <SwitchableComponent
          onChangeSelected={onChangeSelected}
          onChangeSelectedExam={onChangeSelectedExam}
        />
      </header>
      <div className="">
        <div className="h-[450px]">
          <Top3 leaderboard={leaderboard} />
        </div>
        <div className=" mx-auto my-4 w-full p-4 max-w-screen-lg rounded-[30px]  border-primary shadow-sm drop-shadow-sm shadow-black">
          <OverallTable leaderboard={leaderboard} isFetching={isFetching} />
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
