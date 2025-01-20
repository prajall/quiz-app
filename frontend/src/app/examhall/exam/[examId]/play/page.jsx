"use client";

import { useContext, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Gem } from "lucide-react";
import { ExamContext } from "@/contexts/ExamContext";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { AppContext } from "@/contexts/AppContext";
import { FaSpinner } from "react-icons/fa";

export default function Component() {
  const { examData, setExamData } = useContext(ExamContext);
  const [loading, setLoading] = useState(false);
  const { appData } = useContext(AppContext);
  const examId = useParams().examId;
  const router = useRouter();
  const searchParams = useSearchParams();
  const examTitle = searchParams.get("exam");

  useEffect(() => {
    if (!examData.level) {
      setExamData((prev) => ({ ...prev, level: 1 }));
    }
  }, [examData.level, setExamData]);

  const [time, setTime] = useState(60);
  const [gameMode, setGameMode] = useState("normal");

  useEffect(() => {
    console.log("Time:", time);
    console.log("Game Mode:", gameMode);
    setExamData((prev) => ({ ...prev, time, gameMode }));
  }, [time, gameMode]);

  const notices = [
    "Social media does more harm than good.",
    "Working from home increases productivity.",
    "Artificial intelligence will replace many jobs in the future.",
    "University education is necessary for success in life.",
    "Climate change is the biggest global challenge we face today.",
  ];

  const fetchQuestions = async () => {
    console.log("AppData:", appData.user);
    const cacheKey = `questions-${examId}-level-${appData.level || 1}`;

    try {
      setLoading(true);
      console.log("here")

      // const cache = await caches.open("exams-questions-cache");
      // const cachedResponse = await cache.match(cacheKey);

      // if (cachedResponse) {
      //   console.log("Cache hit for", cacheKey);
      //   const cacheData = await cachedResponse.json();
      //   setExamData((prev) => ({
      //     ...prev,
      //     questions: cacheData.questions,
      //     isPlaying: true,
      //   }));
      //   router.push(`/examhall/exam/${examId}/game?exam=${examTitle}`);
      //   return;
      // }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/question/exam/${examId}?level=${
          appData.level ? appData.level : 1
        }`,
        {
          headers: {
            etutor_id: appData.user?.id,
          },
          withCredentials: true,
        }
      );
      console.log("Questions:",response.data)
      if (response.status === 200) {
        setExamData((prev) => ({
          ...prev,
          questions: response.data,
          isPlaying: true,
        }));
        router.push(`/examhall/exam/${examId}/game?exam=${examTitle}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2 py-4">
        <h2 className="text-2xl font-semibold">{examTitle}</h2>
        <p className=" text-gray-500">Level {examData.level}</p>
        <p className=" text-gray-500">Total Questions: 50</p>
        <p className=" text-gray-500">Coins Required: 50</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mx-auto">
        <Card className="w-full lg:w-1/3">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="timer"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Timer: {Math.floor(time / 60)} min
              </label>
              <Slider
                id="timer"
                min={60}
                max={1200}
                step={60}
                value={[time]}
                onValueChange={(value) => {
                  console.log("Value:", value[0]);
                  setTime(value[0]);
                }}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="gameMode"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Game Mode
              </label>
              <Select value={gameMode} onValueChange={setGameMode}>
                <SelectTrigger id="gameMode">
                  <SelectValue placeholder="Select game mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="descriptive">Descriptive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              className="w-full bg-green-500 hover:bg-green-600"
              onClick={fetchQuestions}
              disabled={loading}
            >
              {loading ? (
                <FaSpinner size={16} className="animate-spin" />
              ) : (
                "PLAY FREE"
              )}
            </Button>
            <Button className="w-full flex gap-2 justify-center items-center bg-orange-500 hover:bg-orange-600">
              <Gem size={14} />
              GO PREMIUM
            </Button>
          </CardContent>
        </Card>
        <Card className="w-full md:w-2/3">
          <CardHeader>
            <CardTitle>Notice</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-decimal pl-5 space-y-2">
              {notices.map((notice, index) => (
                <li key={index}>{notice}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
