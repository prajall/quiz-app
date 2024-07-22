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
import { motion } from "framer-motion";
import { getCookiesClient } from "@/clientSideFunctions";

const OverallTable = ({ leaderboard, isFetching }) => {
  if (!leaderboard || leaderboard.length < 3) {
    return;
  }

  const cookies = getCookiesClient();
  console.log(cookies);

  const formattedLeaderboard = leaderboard.slice(3);
  console.log(formattedLeaderboard);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="!font-semibold">Rank</TableCell>
            <TableCell className="!font-semibold">User</TableCell>
            <TableCell className="!font-semibold" align="right">
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
              <motion.tr
                key={index + item.user}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                variants={fadeInVariants}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className="w-full font-semibold"
              >
                <TableCell
                  component="th"
                  scope="row"
                  className="w-[20%] font-semibold"
                >
                  # {index + 4}
                </TableCell>
                <TableCell className="w-[60%] font-semibold">
                  {item.user}
                </TableCell>
                <TableCell className="w-[20%] font-semibold" align="right">
                  {item.score}
                </TableCell>
              </motion.tr>
            ))}
          {}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OverallTable;
