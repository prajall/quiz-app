"use client";
import { useContext, useEffect } from "react";
import { AppContext } from "@/contexts/AppContext";
import { redirect } from "next/navigation";

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

  return children;
}
