"use client";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Top3 from "./components/Top3";
import LeaderboardTable from "./components/LeaderboardTable";
import SwitchableComponent from "./components/Switch";
import { AppContext } from "@/contexts/AppContext";
import Spinner from "@/components/Spinner";

const LeaderboardPage = () => {
  const [isFetchingOverallLeaderboard, setIsFetchingOverallLeaderboard] =
    useState(true);
  const [isFetchingExamsLeaderboard, setIsFetchingExamsLeaderboard] =
    useState(true);
  const [leaderboard, setLeaderboard] = useState([]);
  const [overallLeaderboard, setOverallLeaderboard] = useState([]);
  const [examsLeaderboard, setExamsLeaderboard] = useState([]);
  const [exam_id, setExam_Id] = useState("All");
  const { appData } = useContext(AppContext);

  const exams = appData.exams ? appData.exams : [];

  const fetchOverallLeaderboard = async () => {
    setIsFetchingOverallLeaderboard(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/leaderboard`,
        {
          headers: {
            apiKey: 123456789,
          },
        }
      );
      if (response.status == 200) {
        setOverallLeaderboard(response.data);
        setLeaderboard(response.data);
      } else {
        toast.error("Failed to load Leaderboard");
      }
    } catch (error) {
      if (error.message == "Network Error") {
        toast.error("Error Connecting to the Server");
        return;
      }
      if (error.response.data.data) {
        toast.error(error.response.data);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsFetchingOverallLeaderboard(false);
    }
  };

  const fetchExamsLeaderboard = async () => {
    setIsFetchingExamsLeaderboard(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/leaderboard/allexams`,
        {
          headers: {
            apiKey: 123456789,
          },
        }
      );
      if (response.status == 200) {
        setExamsLeaderboard(response.data.concat(response.data));
      } else {
        toast.error("Failed to load Leaderboard");
      }
    } catch (error) {
      if (error.message == "Network Error") {
        toast.error("Error Connecting to the Server");
        return;
      }
      if (error.response.data.data) {
        toast.error(error.response.data);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsFetchingExamsLeaderboard(false);
    }
  };

  useEffect(() => {
    fetchOverallLeaderboard();
    fetchExamsLeaderboard();
  }, []);

  const onChangeSelected = (selected) => {
    if (selected === "Overall") {
      setLeaderboard(overallLeaderboard);
      setExam_Id("All");
    } else {
      setLeaderboard(examsLeaderboard[0]?.leaderboard);
      setExam_Id("1001");
      return;
    }
  };
  const onChangeSelectedExam = (selectedExam) => {
    setLeaderboard(examsLeaderboard[selectedExam]?.leaderboard);
    setExam_Id(exams[selectedExam].exam_id);
  };

  if (isFetchingOverallLeaderboard) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner size={20} />
        <p className="ml-2">Loading</p>
      </div>
    );
  }

  return (
    <div className="mt-4 ">
      <header className="py-2 max-w-screen-lg mx-auto md:flex justify-between">
        <h2 className="text-2xl font-semibold text-primary text-center ">
          Leaderboard
        </h2>
        <SwitchableComponent
          onChangeSelected={onChangeSelected}
          onChangeSelectedExam={onChangeSelectedExam}
        />
      </header>
      <div className="">
        <div className="h-[450px]">
          <Top3 leaderboard={leaderboard?.slice(0, 3)} />
        </div>

        <LeaderboardTable
          leaderboard={leaderboard?.slice(3)}
          isFetching={isFetchingOverallLeaderboard}
          startFrom={4}
          exam_id={exam_id}
        />
      </div>
    </div>
  );
};

export default LeaderboardPage;
