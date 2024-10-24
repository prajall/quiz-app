import { useState } from "react";

const QuestionDisplay = ({ question, setAnsweredTrue, isAnswered }) => {
  if (!question) return null;
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    if (!isAnswered) {
      const isCorrect = option === question.opt_correct;
      setSelectedOption(option);
      setAnsweredTrue(isCorrect);
    }
  };

  const getOptionStyles = (option) => {
    let baseStyles =
      "w-full flex items-center gap-2 p-2 text-left text-black rounded-lg bg-white shadow-md ";
    let outlineStyles = "";
    let bgStyles =
      "text-sm text-white aspect-square w-10 h-10 flex items-center justify-center font-semibold rounded ";

    if (!isAnswered) {
      outlineStyles += "hover:outline hover:outline-blue-500 ";
      bgStyles += "bg-blue-500 ";
    } else {
      if (option === question.opt_correct) {
        outlineStyles += "outline outline-green-500 ";
        bgStyles += "bg-green-500 ";
      } else if (option === selectedOption && option !== question.opt_correct) {
        outlineStyles += "outline outline-red-500 ";
        bgStyles += "bg-red-500 ";
      } else {
        bgStyles += "bg-blue-500 ";
      }
    }

    return { button: baseStyles + outlineStyles, optionBg: bgStyles };
  };

  return (
    <div>
      <div className="bg-white p-4 mb-4 rounded-b-md shadow-md text-center">
        <h2 className="text-xl font-bold mb-4">{question?.question?.name}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["A", "B", "C", "D"].map((option) => {
          const styles = getOptionStyles(option);
          return (
            <button
              key={option}
              className={styles.button}
              onClick={() => handleOptionClick(option)}
              disabled={isAnswered}
            >
              <div className={styles.optionBg}>{option}</div>
              {question[`opt_${option}`]?.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionDisplay;
