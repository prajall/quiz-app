import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { exams } from "@/examData";

const SwitchableComponent = ({ onChangeSelected, onChangeSelectedExam }) => {
  const [selected, setSelected] = useState("Overall");
  const [selectedExam, setSelectedExam] = useState(0);
  const [bgStyle, setBgStyle] = useState({});
  const buttonsRef = useRef([]);

  const handleExamSelection = (event) => {
    setSelectedExam(event.target?.value);
  };

  useEffect(() => {
    console.log(selected);
    const currentIndex = ["Overall", "Exams"].indexOf(selected);
    if (buttonsRef.current[currentIndex]) {
      const currentButton = buttonsRef.current[currentIndex];
      setBgStyle({
        width: currentButton.offsetWidth + 3,
        transform: `translateX(${currentButton.offsetLeft - 3}px)`,
      });
    }
  }, [selected]);

  useEffect(() => {
    setSelectedExam(0);
    onChangeSelected(selected);
  }, [selected]);
  useEffect(() => {
    onChangeSelectedExam(selectedExam);
  }, [selectedExam]);

  return (
    <div className="w-fit mx-auto md:m-0">
      <div className="relative flex w-fit py-2 text-xs space-x-1 border border-primary p-1 my-2 rounded-xl">
        <div
          className="absolute top-1 left-0 h-8 bg-primary rounded-lg transition-all duration-500"
          style={bgStyle}
        ></div>
        {["Overall", "Exams"].map((option, index) => (
          <button
            key={option}
            ref={(el) => (buttonsRef.current[index] = el)}
            onClick={() => setSelected(option)}
            className={`relative z-10 px-4 py-1 rounded-lg duration-500 ${
              selected === option ? "text-white" : "text-primary"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* <AnimatePresence> */}
      {selected === "Exams" && (
        <motion.div
          key="examSelector"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <div className="w-full absolute flex justify-end left-1/2 -translate-x-1/2  ">
            <Select
              onChange={handleExamSelection}
              className="h-10 rounded-lg text-xs w-full "
              value={selectedExam}
            >
              {exams.map((exam, index) => (
                <MenuItem value={index} className="text-xs">
                  {exam.name}
                </MenuItem>
              ))}
            </Select>
          </div>
        </motion.div>
      )}
      {/* </AnimatePresence> */}
    </div>
  );
};

export default SwitchableComponent;
