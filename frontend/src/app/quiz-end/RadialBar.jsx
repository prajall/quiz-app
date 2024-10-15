"use client";
import { QuizContext } from "@/contexts/QuizContext";
import React, { useContext } from "react";
import Chart from "react-apexcharts";

const RadialChartComponent = () => {
  const { quizData } = useContext(QuizContext);

  const series = [
    quizData.correct,
    quizData.incorrect,
    quizData.questions.length - quizData.correct - quizData.incorrect,
  ];
  const options = {
    chart: {
      type: "donut",
    },
    labels: ["Correct", "Incorrect", "Not Answered"],
    colors: ["#284b63", "#dc3545", "#bbbbbb"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
          dataLabels: {
            enabled: true,
            // dropShadow: false,
          },
        },
      },
    ],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: "Solved",
              formatter: function (w) {
                return `${quizData.correct}/${quizData.questions.length}`;
              },
              style: {
                fontSize: "20px",
                // fontFamily: "Arial, sans-serif",
                fontWeight: "bold",
                color: "#000",
              },
            },
          },
        },
      },
    },
    states: {
      active: {
        filter: {
          type: "none",
        },
        size: 10,
      },
    },
  };

  return (
    <div className="mx-auto flex justify-center w-full overflow-hidden ">
      <Chart
        options={options}
        series={series}
        type="donut"
        width="450"
        height="450"
      />
    </div>
  );
};

export default RadialChartComponent;
