"use client";
import { AppContext } from "@/contexts/AppContext";
import React, { useContext } from "react";

const layout = ({ children }) => {
  const { appData } = useContext(AppContext);
  //todo: check if user is logged in
  //todo: check if user is admin
  //todo: if not admin, redirect to home page
  if (!appData.isLoading && appData.user.email === "prajal@gmail.com")
    return <div>{children}</div>;
};

export default layout;
