import React from "react";

import ExamComponent from "./components/ExamComponent";

const ExamHallPage = () => {
  const exam = {
    _id: "66f68e69e8d137eb28cc72fd",
    exam_id: "1001",
    totalQuestions: 13548,
    totalLevels: 271,
    title: "शिक्षा सेवा आयोग",
    price: 1299,
    discount: 5,
    subTitle: "General Knowledge",
    isActive: true,
    __v: 0,
  };

  return (
    <div>
      <div className="grid py-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ExamComponent exam={exam} />
        <ExamComponent exam={exam} />
        <ExamComponent exam={exam} />
        <ExamComponent exam={exam} />
        <ExamComponent exam={exam} />
        <ExamComponent exam={exam} />
        <ExamComponent exam={exam} />
        <ExamComponent exam={exam} />
        <ExamComponent exam={exam} />
        <ExamComponent exam={exam} />
        <ExamComponent exam={exam} />
      </div>
    </div>
  );
};

export default ExamHallPage;
