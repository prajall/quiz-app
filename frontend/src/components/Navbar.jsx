"use client";
import axios from "axios";
import { LogOut, Menu, Router, User } from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { AppContext } from "@/contexts/AppContext";
import Cookies from "js-cookie";

const Navbar = () => {
  const { appData, setAppData } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);

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
      <div className="md:w-11/12 w-full max-w-screen-xl px-2 md:px-0 mx-auto flex items-end justify-between">
        <div className="flex items-center">
          <Sheet open={sheetOpen} onOpenChange={(val) => setSheetOpen(val)}>
            <SheetTrigger className="md:hidden text-white mr-1">
              <Menu />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-secondary text-white bg-opacity-90"
            >
              <SheetHeader>
                <SheetTitle className="text-white">Links</SheetTitle>
              </SheetHeader>
              <div className="mt-4 ">
                <ul className="space-y-3">
                  <li>
                    <Link
                      onClick={() => setSheetOpen(false)}
                      href={"/leaderboard"}
                      className="hover:underline"
                    >
                      Leaderboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setSheetOpen(false)}
                      href={"/leaderboard"}
                      className="hover:underline"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setSheetOpen(false)}
                      href={"/leaderboard"}
                      className="hover:underline"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setSheetOpen(false)}
                      href={"/leaderboard"}
                      className="hover:underline"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </SheetContent>
          </Sheet>
          <Link href={"/"} className="font-bold text-3xl text-white">
            QUIZ<span className="text-gray">pro</span>
          </Link>
          <div className="ml-6 hidden md:flex">
            <Link href={"/leaderboard"} className=" text-sm text-white">
              {" "}
              Leaderboard
            </Link>
          </div>
        </div>
        <div className="flex gap-2 items-end">
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
    </div>
  );
};

export default Navbar;
