"use client";

import { useState } from "react";
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

export default function Component() {
  const [time, setTime] = useState(60);
  const [gameMode, setGameMode] = useState("normal");

  const notices = [
    "Social media does more harm than good.",
    "Working from home increases productivity.",
    "Artificial intelligence will replace many jobs in the future.",
    "University education is necessary for success in life.",
    "Climate change is the biggest global challenge we face today.",
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-4 mt-4 mx-auto">
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
              onValueChange={(value) => setTime(value[0])}
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
          <Button className="w-full bg-green-500 hover:bg-green-600">
            PLAY FREE
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
  );
}
