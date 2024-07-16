import axios from "axios";
import React from "react";
import QuizSettings from "./QuizSettings";

const GamePage = () => {
  console.log("Render GamePage");
  return (
    <div>
      <QuizSettings />
    </div>
  );
};

export default GamePage;
