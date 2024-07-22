"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import axios from "axios";

const OverallTable = ({ leaderboard, isFetching }) => {
  if (!leaderboard || leaderboard.length < 3) {
    return;
  }

  const formattedLeaderboard = leaderboard.slice(3);
  console.log(formattedLeaderboard);

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="font-semibold">Rank</TableCell>
            <TableCell className="font-semibold">User</TableCell>
            <TableCell className="font-semibold" align="right">
              Score
            </TableCell>
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
            formattedLeaderboard.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className="w-full"
              >
                <TableCell component="th" scope="row" className="w-[20%]">
                  # {index + 4}
                </TableCell>
                <TableCell className="w-[60%]">{item.user}</TableCell>
                <TableCell className="w-[20%]" align="right">
                  {item.score}
                </TableCell>
              </TableRow>
            ))}
          <TableRow
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            className="w-full"
          >
            <TableCell component="th" scope="row" className="w-[20%]">
              # 7
            </TableCell>
            <TableCell className="w-[60%]">667676767sdf6767d6f77</TableCell>
            <TableCell className="w-[20%]" align="right">
              21
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OverallTable;
