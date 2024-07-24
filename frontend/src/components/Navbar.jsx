"use client";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
            {user.image && <Avatar alt="Profile Picture" src={user.image} />}
            {!user.image && (
              <>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <Avatar
                    sx={{
                      color: "#284b63",
                      width: 35,
                      height: 35,
                      fontSize: 19,
                    }}
                  >
                    {user.email.charAt(0).toUpperCase()}
                  </Avatar>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleLogout} disabled={isSubmitting}>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
