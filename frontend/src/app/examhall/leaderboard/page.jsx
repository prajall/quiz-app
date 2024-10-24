"use client";
import Leaderboard from "../components/Leaderboard";
import Top3 from "@/app/leaderboard/components/Top3";

const leaderData = [
  {
    id: 1,
    name: "Ganesh Lal Yadav",
    score: 45000,
    avatar: "/path/to/avatar1.jpg",
  },
  {
    id: 2,
    name: "Diwas Raj Poudel",
    score: 42000,
    avatar: "/path/to/avatar2.jpg",
  },
  {
    id: 3,
    name: "Roshan Bhusal",
    score: 40000,
    avatar: "/path/to/avatar3.jpg",
  },
  { id: 4, name: "Prem Basnet", score: 40000, avatar: "/path/to/avatar4.jpg" },
  // ... other leaders
];

const userRankData = {
  position: 102,
  score: 11580,
  avatar: "/path/to/user-avatar.jpg",
};

export default function LeaderboardPage() {
  //   return <Leaderboard leaders={leaderData} userRank={userRankData} />;
  return <Top3 />;
}
