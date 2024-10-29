"use client";
import { useContext, useEffect } from "react";
import { AppContext } from "@/contexts/AppContext";
import { redirect } from "next/navigation";
import coins from "@/assets/coins.png";
import Image from "next/image";

export default function ExamHallLayout({ children }) {
  const { appData } = useContext(AppContext);

  useEffect(() => {
    if (!appData.isLoading && !appData.user) {
      redirect("/login");
    }
  }, [appData.isLoading, appData.user]);

  if (appData.isLoading) {
    return null;
  }

  return (
    <div>
      <div className="bg-[#3490dc] flex justify-between items-center relative h-16 rounded-b-lg">
        <div className="h-14 w-14 mx-auto rounded-full overflow-hidden border-2 border-white ">
          <img
            src={
              "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
            }
            alt="User avatar"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-4 shadow-md rounded-xl bg-[#349aee] text-white px-3 py-2 flex items-center gap-2">
          <Image src={coins} alt="Coins" className="w-6" />
          <div className="flex flex-col text-left justify-start">
            {/* <span className="text-xs">Coins</span> */}
            <span className="text-sm font-semibold">
              {appData.examhallUser?.coins}
            </span>
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
