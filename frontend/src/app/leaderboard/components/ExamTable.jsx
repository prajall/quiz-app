"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { toast } from "react-toastify";
import { exams } from "@/examData";

const ExamTable = () => {
  const [isFetching, setIsFetching] = useState(false);

  const [allExamsLeaderboard, setAllExamsLeaderboard] = useState([]);

  const fetchAllExamsLeaderboard = async () => {
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
        setAllExamsLeaderboard(response.data.concat(response.data));
        console.log(response.data);
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
    fetchAllExamsLeaderboard();
  }, []);

  return (
    <div className="flex gap-2 overflow-x-auto">
      {allExamsLeaderboard.map((leaderboard) => (
        <div className=" p-2 ">
          <p className="font-semibold text-secondary text-center">
            {exams.find((exam) => exam.exam_id === leaderboard.exam_id)?.name ||
              leaderboard.exam_id}
          </p>
          <TableContainer className="border rounded-lg shadow-sm shadow-black">
            <Table aria-label="simple table">
              <TableHead className="font-semibold">
                <TableRow>
                  <TableCell>Rank</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell align="right">Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isFetching && (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    loading...
                  </TableRow>
                )}
                {!isFetching &&
                  leaderboard.leaderboard.map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      className={`${index === 0 ? "text-[#ffd700]" : ""}  ${
                        index === 1 ? "text-[#c0c0c0]" : ""
                      }  ${index === 2 ? "text-[#cd7f32]" : ""}`}
                    >
                      <TableCell component="th" scope="row">
                        # {index + 1}
                      </TableCell>
                      <TableCell className="w-[60%]">{item.user}</TableCell>
                      <TableCell className="w-[20%]" align="right">
                        {item.score}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}
    </div>
  );
};

export default ExamTable;
