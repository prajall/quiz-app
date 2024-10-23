"use client";

import React, { useState, useEffect } from "react";

// const Timer = ({ timeLeft, totalTime }) => {

//   const radius = 30;
//   const circumference = 2 * Math.PI * radius;
//   const strokeDashoffset = circumference * (1 - timeLeft / totalTime);

//   return (
//     <div className="relative w-20 h-20">
//       <svg className="w-full h-full" viewBox="0 0 100 100">
//         <circle
//           className="text-gray-200"
//           strokeWidth="8"
//           stroke="currentColor"
//           fill="transparent"
//           r={radius}
//           cx="50"
//           cy="50"
//         />
//         <circle
//           className="text-green-500"
//           strokeWidth="8"
//           stroke="currentColor"
//           fill="transparent"
//           r={radius}
//           cx="50"
//           cy="50"
//           style={{
//             strokeDasharray: circumference,
//             strokeDashoffset: strokeDashoffset,
//             strokeLinecap: "round",
//             transform: "rotate(-90deg)",
//             transformOrigin: "50% 50%",
//           }}
//         />
//       </svg>
//       <div className="absolute inset-0 flex items-center justify-center">
//         <span className="text-2xl font-bold">
//           {Math.floor(timeLeft / 60)}:
//           {(timeLeft % 60).toString().padStart(2, "0")}
//         </span>
//       </div>
//     </div>
//   );
// };

const Timer = ({ totalTime, timeLeft }) => {
  const radius = 35; // Radius of the circle
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius; // Circumference of the circle

  // Calculate the stroke-dashoffset based on the remaining time
  const strokeDashoffset =
    circumference - (timeLeft / totalTime) * circumference;

  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      <svg className="absolute top-0 left-0" width="100" height="100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="lightgray"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Timer ring */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="green"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 200ms linear" }} // Smooth transition
          transform="rotate(-90 50 50)" // Rotate the circle to start from the top
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg ml-[3px] mt-[3px] font-bold">
        {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
      </div>
    </div>
  );
};
export default function Component({
  question = {
    _id: "66870ed7ba044061b507abd8",
    id: "1",
    exam_id: "1010",
    opt_correct: "D",
    __v: 0,
    description: "",
    question: {
      name: "1. सप्तगण्डकी नदीको सबैभन्दा ठूलो सहायक नदी कुन हो ?",
    },
    opt_A: {
      name: "(क) मस्याङ्दी",
    },
    opt_B: {
      name: "(ख) बुढीगण्डकी",
    },
    opt_C: {
      name: "(ग) सेती",
    },
    opt_D: {
      name: "(घ) कालीगण्डकी",
    },
    exam: "66f68fc4e8d137eb28cc7319",
  },
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isAnswered]);

  const handleOptionClick = (option) => {
    if (!isAnswered) {
      setSelectedOption(option);
      setIsAnswered(true);
    }
  };

  const getOptionColor = (option) => {
    if (!isAnswered) return "bg-blue-500";
    if (option === question.opt_correct) return "bg-green-500";
    if (option === selectedOption) return "bg-red-500";
    return "bg-blue-500";
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-center mb-6">
        <Timer timeLeft={timeLeft} totalTime={60} />
      </div>
      <h2 className="text-xl font-bold mb-4">{question.question.name}</h2>
      <div className="space-y-4">
        {["A", "B", "C", "D"].map((option) => (
          <button
            key={option}
            className={`w-full p-4 text-left text-white rounded-lg ${getOptionColor(
              option
            )}`}
            onClick={() => handleOptionClick(option)}
            disabled={isAnswered}
          >
            {question[`opt_${option}`].name}
          </button>
        ))}
      </div>
    </div>
  );
}
