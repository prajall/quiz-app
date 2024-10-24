"use client";

import React from "react";

const Leaderboard = ({ leaders, userRank }) => {
  const podiumPositions = leaders.slice(0, 3);
  const otherPositions = leaders.slice(3);

  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="flex justify-center items-end h-64">
        {podiumPositions.map((leader, index) => (
          <div
            key={leader.id}
            className={`flex flex-col items-center mx-2 ${
              index === 0
                ? "order-2 h-full"
                : index === 1
                ? "order-1 h-5/6"
                : "order-3 h-4/6"
            }`}
          >
            <img
              src={leader.avatar}
              alt={leader.name}
              className="w-16 h-16 rounded-full border-4 border-white mb-2"
            />
            <div
              className={`flex flex-col items-center justify-end p-4 rounded-t-lg w-24 ${
                index === 0
                  ? "bg-yellow-400"
                  : index === 1
                  ? "bg-gray-300"
                  : "bg-yellow-600"
              }`}
            >
              <span className="text-2xl font-bold">
                {index === 0 ? "1st" : index === 1 ? "2nd" : "3rd"}
              </span>
              <span className="font-semibold">
                {leader.score.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {leaders.map((leader, index) => (
          <div key={leader.id} className="flex items-center p-4 border-b">
            <img
              src={leader.avatar}
              alt={leader.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <span className="flex-grow font-semibold">{leader.name}</span>
            <span className="font-bold mr-4">
              {leader.score.toLocaleString()}
            </span>
            {index < 3 && (
              <img
                src={`/medal-${index + 1}.png`}
                alt={`${index + 1} place`}
                className="w-6 h-6"
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 bg-gray-100 rounded-lg p-4 flex items-center">
        <span className="font-semibold mr-4">#{userRank.position}</span>
        <img
          src={userRank.avatar}
          alt="You"
          className="w-12 h-12 rounded-full mr-4"
        />
        <span className="flex-grow font-semibold">You</span>
        <span className="font-bold">{userRank.score.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default Leaderboard;
