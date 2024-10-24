import React from "react";
import GreenButton from "@/app/examhall/components/GreenButton";
import OrangeButton from "@/app/examhall/components/OrangeButton";
import { FaUnlock } from "react-icons/fa";
import { Rubik_Doodle_Shadow } from "next/font/google";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

const rubikDoodleShadow = Rubik_Doodle_Shadow({
  subsets: ["latin"],
  weight: ["400"],
});

const LevelComponent = ({ level }) => {
  const { level: levelNumber, unlocked, totalSolved, totalCorrect } = level;

  const accuracy =
    totalSolved > 0 ? Math.round((totalCorrect / totalSolved) * 100) : 0;

  if (!unlocked) {
    return (
      <div className="bg-white h-28 relative flex gap-4 justify-between rounded-lg p-4 shadow-sm">
        <div className="absolute w-full h-full p-4 bg-black/60 top-0 left-0 rounded-lg z-50 flex justify-between items-center">
          <div className="w-14 my-auto">
            <div className="w-full aspect-square object-contain text-white border-[1.5px] border-white rounded-full p-2 flex justify-center items-center">
              <Lock size={32} />
            </div>
          </div>
          <button
            className={` bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2 justify-center w-28 text-xs py-2 rounded-md`}
          >
            <FaUnlock size={14} />
            Unlock
          </button>
        </div>
        <div className=" flex gap-4 items-center opacity-50 overflow-hidden">
          <div className="w-14">
            <div className="w-full  aspect-square object-contain bg-white rounded-full p-2 flex justify-center items-center"></div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center">
              <h2 className={`text-lg `}>Level {levelNumber}</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white h-28 flex gap-4 justify-between rounded-lg p-4 shadow-sm">
      <div className=" flex gap-4 items-center overflow-hidden">
        <div className="w-14">
          <div className="w-full  aspect-square object-contain bg-white rounded-full p-2 border-[1.5px] border-blue-400 flex justify-center items-center">
            <p
              className={cn(
                "text-2xl font-bold text-blue-600",
                rubikDoodleShadow.className
              )}
            >
              {levelNumber}
            </p>
          </div>
        </div>
        <div className="flex flex-col  justify-center">
          <div className="flex items-center mb-1">
            <h2 className={`font-semibold`}>Level {levelNumber}</h2>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              Accuracy:{" "}
              <span className="text-muted-foreground">{accuracy}%</span>
            </p>
            <p className="text-sm text-gray-600">
              Score:{" "}
              <span className="text-muted-foreground">
                {totalCorrect}/{totalSolved}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center flex-col gap-2 w-fit items-end">
        {totalSolved > 0 && <GreenButton text="Completed" />}
        <OrangeButton text="Play Again" />
      </div>
    </div>
  );
};

export default LevelComponent;
