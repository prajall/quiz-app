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

const LeaderboardTable = () => {
  const leaderboard = [
    {
      userInfo: {
        _id: "user1",
        name: "Alice",
        image:
          "http://res.cloudinary.com/dwjhsf65j/image/upload/v1722151225/profile_pictures/lvak9mh0vrp4kgr6loca.jpg",
      },
      score: 3200,
    },
    {
      userInfo: {
        _id: "user2",
        name: "Bob",
        image:
          "http://res.cloudinary.com/dwjhsf65j/image/upload/v1722151225/profile_pictures/lvak9mh0vrp4kgr6loca.jpg",
      },
      score: 2800,
    },
    {
      userInfo: {
        _id: "user3",
        name: "Charlie",
        image:
          "http://res.cloudinary.com/dwjhsf65j/image/upload/v1722151225/profile_pictures/lvak9mh0vrp4kgr6loca.jpg",
      },
      score: 2500,
    },
    {
      userInfo: {
        _id: "user3",
        name: "Charlie",
        image:
          "http://res.cloudinary.com/dwjhsf65j/image/upload/v1722151225/profile_pictures/lvak9mh0vrp4kgr6loca.jpg",
      },
      score: 2500,
    },
    {
      userInfo: {
        _id: "user3",
        name: "Charlie",
        image:
          "http://res.cloudinary.com/dwjhsf65j/image/upload/v1722151225/profile_pictures/lvak9mh0vrp4kgr6loca.jpg",
      },
      score: 2500,
    },
    {
      userInfo: {
        _id: "user3",
        name: "Charlie",
        image:
          "http://res.cloudinary.com/dwjhsf65j/image/upload/v1722151225/profile_pictures/lvak9mh0vrp4kgr6loca.jpg",
      },
      score: 2500,
    },
  ];
  const isFetching = false;
  const startFrom = 4;
  const exam_id = "dummy_exam_id";
  const { appData } = useContext(AppContext);
  const [userIndex, setUserIndex] = useState({
    _id: "user4",
    rank: 54,
    score: 2000,
  });

  if (!leaderboard) {
    return null;
  }

  const fadeInVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="mx-auto w-full p-4 max-w-screen-lg rounded-[30px]">
      <div className="border rounded-md">
        <div className="h-[240px] overflow-y-auto scrollbar-hide">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
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

            <TableFooter className="sticky bottom-0 bg-background">
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
                      {/* {appData.user?.name || appData.user?._id}
                       */}
                      User
                    </span>
                  </span>
                </TableCell>
                <TableCell>{userIndex?.score}</TableCell>
              </motion.tr>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardTable;
