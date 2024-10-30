import { Check, X } from "lucide-react";
import React from "react";

const DescriptionComponent = ({
  question = {
    question: {
      name: "पाठ्यक्रमको विषयवस्तुको संगठनका आधार कुन हो?",
    },
    opt_A: {
      name: "विषयवस्तु",
    },
    opt_B: {
      name: "Hey B",
    },
    opt_C: {
      name: "C",
    },
    opt_D: {
      name: "option D",
    },
    opt_correct: "A",
    userAnswer: "A",
  },
  index,
}) => {
  return (
    <div
      className={`relative w-full p-4 border-2 rounded-md bg-white pr-8 space-y-2 ${
        question.userAnswer === question?.opt_correct
          ? "border-green-300"
          : "border-red-300"
      } shadow-sm ${
        question.userAnswer === question?.opt_correct
          ? "shadow-green-200/50"
          : "shadow-red-200/50"
      }`}
    >
      <div className="absolute top-2 right-2">
        {question.userAnswer === question?.opt_correct ? (
          <div className="bg-green-500 text-white rounded-full p-1">
            <Check size={12} />
          </div>
        ) : (
          <div className="bg-red-500 text-white rounded-full p-1">
            <X size={12} />
          </div>
        )}
      </div>
      <p className="mt-0">
        <span className="font-semibold">Q{index + 1}:</span>{" "}
        {question.question.name}
      </p>

      <p>
        <span className="font-semibold">Your Answer: </span>
        {["A", "B", "C", "D"].map((option) => {
          if (question.userAnswer === option) {
            return question[`opt_${option}`].name;
          }
          return null;
        })}
      </p>
      <p>
        <span className="font-semibold">Correct Answer: </span>
        {["A", "B", "C", "D"].map((option) => {
          if (question.opt_correct === option) {
            return question[`opt_${option}`].name;
          }
          return null;
        })}
      </p>
    </div>
  );
};

export default DescriptionComponent;
