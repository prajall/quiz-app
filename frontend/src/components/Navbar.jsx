"use client";
import axios from "axios";
import { LogOut, Router, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
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

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleLogout = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:3001/user/logout", {
        withCredentials: true,
      });
      if (response.status == 200) {
        setUser(null);
        toast.success("Logged Out Successfully");
        router.push("/");
      }
    } catch (error) {
      toast.error("Error Logging out");
      console.log("Error Logging out:", error);
    }
  };
  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:3001/user/getuser", {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="w-full bg-primary h-16 flex items-center">
      <div className="md:w-11/12 w-full max-w-screen-xl px-2 md:px-0 mx-auto flex justify-between">
        <h1 className="font-bold text-3xl text-white">
          QUIZ<span className="text-gray">pro</span>
        </h1>
        {!user && (
          <menu className="hidden sm:flex gap-2">
            <button className=" text-white px-4 hover:underline">Signup</button>
            <button className="shadow-none px-4  bg-primary hover:bg-primary hover:shadow:none text-white border border-white rounded-full">
              Login
            </button>
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
                      {user.email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
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
