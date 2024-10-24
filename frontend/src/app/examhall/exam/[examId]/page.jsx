"use client";

import { useEffect, useState } from "react";
import LevelComponent from "./components/LevelComponent";
import axios from "axios";

export default function ExamPage({ params }) {
  const { examId } = params;
  const [levels, setLevels] = useState([]);
  const getLevels = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/gamedata/levels?examId=${examId}`,
        { headers: { etutor_id: "96712" } }
      );
      console.log(response);
      if (response.status === 200) {
        setLevels(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
