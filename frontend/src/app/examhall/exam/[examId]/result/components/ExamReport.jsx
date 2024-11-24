"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Component({
  result = {
    attempts: 23,
    correct: 12,
    examTitle: "Title",
    gameMode: "normal",
    isLoading: false,
    isPlaying: true,
    level: 1,
  },
}) {
  const [exam, setExam] = useState("");

  const examId = useParams().examId || "";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryObject = {};
    for (const [key, value] of params.entries()) {
      queryObject[key] = value;
    }
    console.log("queryObject", queryObject);
    setExam(queryObject.exam);
  }, []);

  const totalQuestions = 50;
  const incorrect = result.attempts - result.correct;
  const unattempted = totalQuestions - result.attempts;

  const correctPercentage = (result.correct / totalQuestions) * 100;
  const incorrectPercentage = (incorrect / totalQuestions) * 100;
  const unattemptedPercentage = (unattempted / totalQuestions) * 100;

  const chartConfig = {
    correct: {
      label: "Correct",
      color: "#3b82f6",
    },
    incorrect: {
      label: "Incorrect",
      color: "#ef4444",
    },
    unattempted: {
      label: "Unattempted",
      color: "#9ca3af",
    },
  };

  const chartData = [
    { type: "correct", value: result.correct, fill: "#3b82f6" },
    { type: "incorrect", value: incorrect, fill: "#ef4444" },
    { type: "unattempted", value: unattempted, fill: "#9ca3af" },
  ];

  return (
    <Card className="w-full h-full flex flex-col justify-between">
      <CardHeader className="pb-0">
        <CardTitle className="text-center ">Exam Report</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-[200px] w-full relative">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <PieChart
              cx="50%"
              cy="50%"
              data={chartData}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              isAnimationActive={true}
              animationBegin={0}
              animationDuration={800}
            >
              <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="type"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold">{`${Math.round(
                correctPercentage
              )}%`}</div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
          </div>
        </div>

        <div className="pt-4 space-y-2 text-sm text-muted-foreground">
          {/* <div className="flex justify-between">
              <span>Game Mode:</span>
              <span className="capitalize">{result.gameMode}</span>
            </div> */}
          <div className="flex gap-1 ">
            <span>Level:</span>
            <span>{result.level}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span>Correct Answers</span>
              </div>
              <span className="font-medium">
                {result.correct} / {totalQuestions}
              </span>
            </div>
            <Progress value={correctPercentage} className="bg-gray-100 h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span>Incorrect Answers</span>
              </div>
              <span className="font-medium">
                {incorrect} / {totalQuestions}
              </span>
            </div>
            <Progress value={incorrectPercentage} className="bg-gray-100 h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#9ca3af]" />
                <span>Attempted Questions</span>
              </div>
              <span className="font-medium">
                {result.attempts} / {totalQuestions}
              </span>
            </div>
            <Progress value={result.attempts} className="bg-gray-100 h-2" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4 w-full">
          <Link
            href={`/examhall/exam/${examId}/play?exam=${exam}`}
            className="w-full"
          >
            <Button
              variant="outline"
              className="border-2 w-full text-blue-500 font-semibold hover:bg-blue-50 hover:text-blue-500  border-blue-500"
            >
              Play again
            </Button>
          </Link>
          <Link href={`/examhall`} className="w-full">
            <Button
              variant="outline"
              className="border-2 w-full text-orange-400 font-semibold border-orange-400 hover:bg-orange-50 hover:text-orange-500"
            >
              {" "}
              Exit
            </Button>
          </Link>
        </div>
        <Link
          className="w-full"
          href={`/examhall/exam/${examId}/result/description`}
        >
          <Button className="w-full">View Detailed Report</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
