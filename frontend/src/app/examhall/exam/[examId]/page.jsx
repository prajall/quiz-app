"use client";

import { useContext, useEffect, useState } from "react";
import LevelComponent from "./components/LevelComponent";
import axios from "axios";
import { AppContext } from "@/contexts/AppContext";

export default function ExamPage({ params }) {
  const { appData } = useContext(AppContext);
  const { examId } = params;
  const [levels, setLevels] = useState([]);
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
    }
  };

  useEffect(() => {
    if (appData.user) {
      getLevels();
    }
  }, [appData.user]);

  useEffect(() => {
    getLevels();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
      {levels.map((level) => (
        <LevelComponent level={level} key={level._id} />
      ))}
    </div>
  );
}
