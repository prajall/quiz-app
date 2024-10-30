import React, { useContext, useState } from "react";
import coin from "@/assets/coins.png";
import Image from "next/image";
import GreenButton from "@/app/examhall/components/GreenButton";
import OrangeButton from "@/app/examhall/components/OrangeButton";
import { FaUnlock } from "react-icons/fa";
import { Rubik_Doodle_Shadow } from "next/font/google";
import { cn } from "@/lib/utils";
import { Loader2, Lock } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { ExamContext } from "@/contexts/ExamContext";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "@/contexts/AppContext";

const rubikDoodleShadow = Rubik_Doodle_Shadow({
  subsets: ["latin"],
  weight: ["400"],
});

const LevelComponent = ({ level, examTitle, unlockable, onLevelUnlocked }) => {
  const { appData, setAppData } = useContext(AppContext);
  const { examData, setExamData } = useContext(ExamContext);
  const { examId } = useParams();
  const [levelUnlocked, setLevelUnlocked] = useState(level.unlocked);
  const { level: levelNumber, unlocked, totalSolved, totalCorrect } = level;
  const [loading, setLoading] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const accuracy =
    totalSolved > 0 ? Math.round((totalCorrect / totalSolved) * 100) : 0;

  const router = useRouter();

  const unlockLevel = async () => {
    if (appData.examhallUser.coins < 50) {
      toast.error("Not enough coins");
      return;
    }

    setUnlocking(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/gamedata`,
        {
          level: level.level,
          exam: examId,
          totalSolved: 0,
          totalCorrect: 0,
          playedTime: 8,
          timerSet: 10,
          submittedTime: 8,
          gameMode: "normal",
          playedFrom: "web",
          location: "Ktm",
        },
        {
          headers: {
            etutor_id: appData.user.id,
          },
        }
      );
      console.log(response.status);
      if (response.status == 201) {
        console.log(response.data);
        toast.success("Level Unlocked !!");
        setLevelUnlocked(true);
        onLevelUnlocked();
        setOpen(false);
        setAppData((prev) => ({
          ...prev,
          examhallUser: {
            ...prev.examhallUser,
            coins: prev.examhallUser.coins - 50,
          },
        }));
      }
    } catch (error) {
      console.log(error);
      if (error.message && error.message === "Network Error") {
        toast.error("Failed to connect to server");
      } else {
        toast.error("Failed to unlock level");
      }
    } finally {
      setUnlocking(false);
      setOpen(false);
    }
  };
  const [open, setOpen] = useState(false);

  if (!levelUnlocked) {
    return (
      <div className="bg-white h-28 relative flex gap-4 justify-between rounded-lg p-4 shadow-sm">
        <div className="absolute w-full h-full p-4 bg-black/60 top-0 left-0 rounded-lg z-50 flex justify-between items-center">
          <div className="w-14 my-auto">
            <div className="w-full aspect-square object-contain text-white border-[1.5px] border-white rounded-full p-2 flex justify-center items-center">
              <Lock size={32} />
            </div>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              asChild
              className={` bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2 justify-center w-28 text-xs py-2 rounded-md`}
            >
              <div className="cursor-pointer">
                <FaUnlock size={14} />
                Unlock
              </div>
            </DialogTrigger>
            {unlockable && (
              <DialogContent className="bg-white w-96 rounded-xl">
                <DialogHeader>
                  <DialogTitle className="font-semibold ">
                    Unlock Level {levelNumber} ?
                  </DialogTitle>
                </DialogHeader>
                <DialogFooter className="flex flex-row justify-center gap-4">
                  <DialogClose asChild>
                    <Button variant="outline" className="w-full bg-transparent">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    variant="primary"
                    onClick={unlockLevel}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-yellow-300 rounded-lg flex items-center gap-1"
                  >
                    {unlocking ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>
                        <Image src={coin} alt="coin" className="w-6" />{" "}
                        <span className="font-semibold text-lg">50</span>
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            )}
            {!unlockable && (
              <DialogContent className="bg-white w-96 rounded-lg">
                <DialogHeader>
                  <DialogTitle className="font-normal">
                    Please Unlock previous level first
                  </DialogTitle>
                </DialogHeader>
                <DialogFooter className="flex flex-row justify-right gap-4">
                  <DialogClose asChild>
                    <Button
                      variant="primary"
                      className=" px-6 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center gap-1"
                    >
                      Okay
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            )}
          </Dialog>
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
        <OrangeButton
          text="Play Again"
          onClick={() => {
            setExamData((prev) => ({ ...prev, level: levelNumber }));
            router.push(`/examhall/exam/${examId}/play?exam=${examTitle}`);
          }}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default LevelComponent;
