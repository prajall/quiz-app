"use client";
import React, { useState, useEffect } from "react";

import ExamComponent from "./components/ExamComponent";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";
import MyLoader from "@/components/Skeleton";
const ExamHallPage = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExams = async () => {
    try {
      console.log(process.env.NEXT_PUBLIC_API_URL);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/exam/admin`
      );
      if (response.status === 200) {
        setExams(response.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch exams");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <div>
      <div className="col-span-full  bg-blue-100 border-l-4 text-sm border-blue-500 p-4 my-4 rounded-sm">
        <p>
          <span className="font-semibold text-green-500">Notice: </span>A free
          player can only play using the coins whereas our premium player can
          play all the levels. A free player can collect the coin by liking or
          sharing our post in the feed.
        </p>
      </div>
      <h2 className="font-semibold">Exams:</h2>
      {!loading && exams.length > 0 && (
        <div className="grid py-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exams.map((exam) => (
            <>
              <ExamComponent exam={exam} key={exam._id} />
            </>
          ))}
        </div>
      )}
      {loading && (
        <div className="grid py-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <MyLoader key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamHallPage;
