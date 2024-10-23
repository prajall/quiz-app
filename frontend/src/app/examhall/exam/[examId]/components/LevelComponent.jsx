import React from "react";
import GreenButton from "@/app/examhall/components/GreenButton";
import OrangeButton from "@/app/examhall/components/OrangeButton";
import { FaUnlock } from "react-icons/fa";

const LevelComponent = ({ level }) => {
  const { level: levelNumber, unlocked, totalSolved, totalCorrect } = level;

  const accuracy =
    totalSolved > 0 ? Math.round((totalCorrect / totalSolved) * 100) : 0;

  if (!unlocked) {
    return (
      <div className="bg-white relative flex gap-4 justify-between rounded-lg p-4 shadow-sm">
        <div className="absolute w-full h-full p-4 bg-black/60 top-0 left-0 rounded-lg z-50 flex justify-end items-end">
          <button
            className={` bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2 justify-center w-28 text-xs py-2 rounded-md`}
          >
            <FaUnlock size={14} />
            Unlock
          </button>
        </div>
        <div className=" flex gap-4 items-center opacity-50 overflow-hidden">
          <div className="w-14">
            <img
              src="https://s3-alpha-sig.figma.com/img/decc/0628/cca077fdd627c5c400abddda5a09b65b?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZxeDCTX8FFE-18gOLIlMQs6gm4LXOwVchTNb4aGmRLF~Zw1Nx5haBr048luHJiMRPEi0LpjEqoyAgXCyouaH07l0aKDdvNZjtu~mB1zx7NtuQvLu3l~qunVADDsANT8J~ygo4D~JS4Uewmfy3TRQNu4nJa5HEQN9Pubqm2RoofCluxGlt2lRQdsOgBrlIoSccr6xKP33gvoT01dE03QqxHWlVH~0QZk~ecsIER-N0yVN1s08laqX87Iw2DyCCAHcb3ELhQtJXQPR~StPnkYJb19NwrrISeZzd9hEr7JDc9KPrAS8YQxSDV4XG9O8E2-qdgqzwd1s6Go6MHExUEwWDw__"
              className="w-full aspect-square object-contain bg-white rounded-full p-2 border-[1.5px] border-blue-500"
              alt="quiz icon"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center mb-3">
              <h2 className="text-lg font-semibold">Level {levelNumber}</h2>
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
      </div>
    );
  }

  return (
    <div className="bg-white flex gap-4 justify-between rounded-lg p-4 shadow-sm">
      <div className=" flex gap-4 items-center overflow-hidden">
        <div className="w-14">
          <img
            src="https://s3-alpha-sig.figma.com/img/decc/0628/cca077fdd627c5c400abddda5a09b65b?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZxeDCTX8FFE-18gOLIlMQs6gm4LXOwVchTNb4aGmRLF~Zw1Nx5haBr048luHJiMRPEi0LpjEqoyAgXCyouaH07l0aKDdvNZjtu~mB1zx7NtuQvLu3l~qunVADDsANT8J~ygo4D~JS4Uewmfy3TRQNu4nJa5HEQN9Pubqm2RoofCluxGlt2lRQdsOgBrlIoSccr6xKP33gvoT01dE03QqxHWlVH~0QZk~ecsIER-N0yVN1s08laqX87Iw2DyCCAHcb3ELhQtJXQPR~StPnkYJb19NwrrISeZzd9hEr7JDc9KPrAS8YQxSDV4XG9O8E2-qdgqzwd1s6Go6MHExUEwWDw__"
            className="w-full aspect-square object-contain bg-white rounded-full p-2 border-[1.5px] border-blue-500"
            alt="quiz icon"
          />
        </div>
        <div className="flex flex-col  justify-center">
          <div className="flex items-center mb-1">
            <h2 className="text-lg font-semibold">Level {levelNumber}</h2>
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
