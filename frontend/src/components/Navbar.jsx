"use client";
import axios from "axios";
import { LogOut, Router, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Select, SelectItem } from "./ui/select";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { AppContext } from "@/contexts/AppContext";
import Cookies from "js-cookie";

const Navbar = () => {
  const { appData, setAppData } = useContext(AppContext);
  const [user, setUser] = useState(null);
  console.log(appData);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleLogout = async () => {
    const cookies = Cookies.remove("token");
    console.log(cookies);
    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:3001/user/logout", {
        withCredentials: true,
      });
      if (response.status == 200) {
        setAppData((prev) => ({ ...prev, user: null }));
        toast.success("Logged Out Successfully");
        router.push("/");
      }
    } catch (error) {
      toast.error("Error Logging out");
      console.log("Error Logging out:", error);
    }
  };

  useEffect(() => {
    setUser(appData.user);
  }, [appData.user]);

  return (
    <div className="w-full bg-primary h-16 flex items-center">
      <div className="md:w-11/12 w-full max-w-screen-xl px-2 md:px-0 mx-auto flex justify-between">
        <h1 className="font-bold text-3xl text-white">
          QUIZ<span className="text-gray">pro</span>
        </h1>
        {!user && (
          <menu className="hidden sm:flex gap-2 items-center">
            <Link
              href={"/register"}
              className=" text-white text-sm px-4 hover:underline"
            >
              Signup
            </Link>
            <Link
              href={"/login"}
              className="border text-sm border-white rounded-md px-4 py-1 duration-300 text-white hover:bg-white hover:bg-opacity-10"
            >
              Login
            </Link>
          </menu>
        )}
        {user && (
          <>
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="bg-gray border-2 border-white w-8 h-8">
                    <AvatarImage src={user.image} />
                    <AvatarFallback>
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    {user.name ? user.name : user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    {" "}
                    <User size={16} /> <span className="ml-2">Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    disabled={isSubmitting}
                    className="cursor-pointer"
                  >
                    <LogOut size={16} />
                    <span className="ml-2">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
