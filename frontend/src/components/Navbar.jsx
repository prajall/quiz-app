import { Button } from "@mui/material";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full bg-primary h-16 flex items-center">
      <div className="md:w-11/12 w-full max-w-screen-xl px-2 md:px-0 mx-auto flex justify-between">
        <h1 className="font-bold text-3xl text-white">
          QUIZ<span className="text-gray">pro</span>
        </h1>
        <menu className="hidden sm:flex gap-2">
          <button className=" text-white px-4 hover:underline">Signup</button>
          <button className="shadow-none px-4  bg-primary hover:bg-primary hover:shadow:none text-white border border-white rounded-full">
            Login
          </button>
        </menu>
      </div>
    </div>
  );
};

export default Navbar;
