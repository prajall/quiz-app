"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppContext } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const LeaderboardTable = ({ leaderboard, isFetching, startFrom, exam_id }) => {
  const { appData } = useContext(AppContext);
  const [userIndex, setUserIndex] = useState(null);

  const findUserIndex = async () => {
    if (!appData.user || !exam_id) {
      return;
    }
    try {
      let url;
      console.log(appData.user?._id, exam_id);
      if (exam_id === "All") {
        url = `http://localhost:3001/leaderboard/user`;
      } else if (exam_id) {
        url = `http://localhost:3001/leaderboard/user/exam/${exam_id}`;
      }

      if (url) {
        const response = await axios.get(url, {
          withCredentials: true,
          headers: { apiKey: 123456789 },
        });
        console.log("User Index response", response);
        setUserIndex(response.data);
      }
    } catch (error) {
      if (error.message == "Network Error") {
        toast.error("Error Connecting to the Server");
        return;
      }
      if (error.response) {
        toast.error(error.response.data);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
        toast.error("Error fetching user rank");
      }
      console.error("Error fetching user index:", err);
    }
  };

  useEffect(() => {
    findUserIndex();
  }, [exam_id, appData.user?._id, leaderboard]);
  useEffect(() => {
    findUserIndex();
  }, []);

  useEffect(() => {
    console.log(
      "UserIndex: ",
      userIndex,
      "leaderboard.length:",
      leaderboard?.length
    );
  }, [exam_id, leaderboard]);

  if (!leaderboard) {
    return null;
  }

  const fadeInVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="mx-auto my-4 w-full p-3 max-w-screen-lg rounded-[30px] border-primary shadow-sm drop-shadow-sm shadow-black">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Rank</TableHead>
            <TableHead className="font-semibold">User</TableHead>
            <TableHead className="font-semibold">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isFetching && (
            <TableRow>
              <TableCell colSpan="3">loading...</TableCell>
            </TableRow>
          )}
          {!isFetching &&
            leaderboard.map((item, index) => (
              <motion.tr
                key={item.userInfo._id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                variants={fadeInVariants}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={
                  userIndex?.rank < leaderboard.length &&
                  userIndex._id === item.userInfo?._id
                    ? "border-b border-t font-semibold text-primary bg-muted/50 "
                    : ""
                }
              >
                <TableCell># {index + startFrom}</TableCell>
                <TableCell>
                  <span className="flex gap-2 items-center w-full">
                    <img
                      className="rounded-full w-6 sm:w-8 h-6 md:h-8"
                      src={
                        item.userInfo.image ||
                        "http://res.cloudinary.com/dwjhsf65j/image/upload/v1722151225/profile_pictures/lvak9mh0vrp4kgr6loca.jpg"
                      }
                      alt="User"
                    />
                    <span className="truncate w-full">
                      {item.userInfo.name || item.userInfo._id}
                    </span>
                  </span>
                </TableCell>
                <TableCell>{item.score}</TableCell>
              </motion.tr>
            ))}
        </TableBody>
        {userIndex &&
          userIndex > 3 &&
          !leaderboard.some((item) => item.userInfo._id === userIndex._id) && (
            <TableFooter>
              <motion.tr
                key="footer"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                variants={fadeInVariants}
                transition={{ duration: 0.3 }}
                className="border-b border-t font-semibold text-primary"
              >
                <TableCell>
                  # {userIndex !== null ? userIndex.rank : "N/A"}
                </TableCell>
                <TableCell>
                  <span className="flex gap-2 items-center w-full">
                    <img
                      className="rounded-full w-6 sm:w-8 h-6 md:h-8"
                      src={
                        appData?.user?.image ||
                        "http://res.cloudinary.com/dwjhsf65j/image/upload/v1722151225/profile_pictures/lvak9mh0vrp4kgr6loca.jpg"
                      }
                      alt="User"
                    />
                    <span className="truncate w-full">
                      {appData.user?.name || appData.user?._id}
                    </span>
                  </span>
                </TableCell>
                <TableCell>{userIndex?.score}</TableCell>
              </motion.tr>
            </TableFooter>
          )}
      </Table>
    </div>
  );
};

export default LeaderboardTable;
