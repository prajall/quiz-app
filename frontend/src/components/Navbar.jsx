"use client";
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
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AppContext } from "@/contexts/AppContext";
import axios from "axios";
import { LogOut, Menu, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { motion } from "framer-motion";

const Navbar = () => {
  const { appData, setAppData } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleLogout = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status == 200) {
        setAppData((prev) => ({ ...prev, user: null }));
        toast.success("Logged Out Successfully");
        router.push("/");
      }
    } catch (error) {
      if (error.message == "Network Error") {
        toast.error("Error Connecting to the Server");
        return;
      }
      if (error.response.data) {
        toast.error(error.response.data);
      } else {
        toast.error("Error Logging out");
      }
    }
  };

  const navLinks = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Play",
      link: "/",
    },
    {
      name: "Leaderboard",
      link: "/leaderboard",
    },

    {
      name: "Contacts",
      link: "/",
    },
    {
      name: "Admin",
      link: "/admin",
    },
  ];

  useEffect(() => {
    setUser(appData.user);
  }, [appData.user]);

  return (
    <div className="w-full bg-primary text-white h-16 flex items-center">
      <div className="md:w-11/12 w-full max-w-screen-xl px-2 md:px-0 mx-auto flex items-end justify-between">
        <div className="flex items-center">
          <Sheet open={sheetOpen} onOpenChange={(val) => setSheetOpen(val)}>
            <SheetTrigger className="md:hidden text-white mr-2">
              <Menu />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-primary text-white bg-opacity-90"
            >
              <SheetHeader>
                <SheetTitle className="text-white">Links</SheetTitle>
              </SheetHeader>
              <div className="mt-4 ">
                <ul className="space-y-3">
                  {navLinks.map((navlink, index) => (
                    <motion.li
                      key={index}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index / 10 }}
                      className=" py-1 "
                    >
                      <Link
                        onClick={() => setSheetOpen(false)}
                        href={navlink.link}
                        className="hover:ml-1 duration-300  "
                      >
                        {navlink.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </SheetContent>
          </Sheet>
          <Link href={"/"} className="font-bold text-3xl ">
            QUIZ<span className="text-gray">pro</span>
          </Link>
          <div className="ml-6 hidden md:flex gap-4 ">
            {navLinks.map((navLink) => (
              <Link
                key={navLink.link}
                href={navLink.link}
                className=" text-sm mt-2 text-white  hover:text-white"
              >
                {" "}
                {navLink.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          {!user && (
            <menu className="flex gap-2 items-center">
              <Link
                href={"/register"}
                className="hidden sm:flex text-white text-sm px-4 hover:underline"
              >
                Signup
              </Link>
              <Link
                href={"/login"}
                className="border text-sm border-white rounded-md px-5 py-2 duration-300 text-white hover:bg-white hover:bg-opacity-10"
              >
                Login
              </Link>
            </menu>
          )}
          {user && (
            <>
              <p className="max-w-24 text-xs overflow-hidden text-ellipsis whitespace-nowrap">
                {user?.name}
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="border-2 border-gray ">
                    <AvatarImage src={user.image} />
                    <AvatarFallback>
                      {user?.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    {user?.name ? user.name : user.email}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
