"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaSearch, FaUserAlt, FaBars } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const submitSearch = (e) => {
    e.preventDefault();
    console.log("Search submitted", e.target.search.value);
    router.push(
      `https://etutorclass.com/search?query=${e.target.search.value}`
    );
  };

  return (
    <nav className="bg-[#1C252E]  text-white pt-2" style={{ fontSize: "15px" }}>
      {/* Top Section with Logo, Search, and User Info */}
      <div className=" max-w-[1200px] px-6 md:px-10 lg:px-12 xl:px-0 w-full mx-auto flex flex-col lg:flex-row items-center justify-between">
        {/* Left Section: Logo and Search */}
        <div className="flex flex-col justify-between md:flex-row gap-4 md:gap-14 w-full lg:w-fit mb-4 md:mb-0">
          <div className="flex items-center justify-between w-full md:w-auto ">
            <a href="https://etutorclass.com/">
              <img
                src="https://etutorclass.com/images/logo.png"
                alt="Logo"
                className="w-[150px]"
              />
            </a>
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FaBars size={24} />
            </button>
          </div>

          {/* Search Bar */}
          <form
            className="max-w-full md:max-w-[480px] flex items-center"
            onSubmit={submitSearch}
          >
            <input
              type="text"
              name="search"
              placeholder="Search (courses, tutors)"
              className="rounded-l-sm w-full bg-[#ffffff0d] h-[40px] px-4 text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#3490dc] h-[40px] w-[45px] flex items-center justify-center rounded-r"
            >
              <FaSearch className="text-white" size={16} />
            </button>
          </form>
        </div>

        {/* Right Section: User Info */}
        <div
          className={`flex  gap-2 w-full lg:w-auto items-center justify-between lg:justify-end ${
            isMenuOpen ? "block" : "hidden md:flex"
          }`}
        >
          <div className="flex gap-1 items-center ">
            <FaUserAlt />
            <span className="">Roshan Bhusal</span>
          </div>
          <div className="flex gap-2">
            <button className="bg-[#3490dc] hover:bg-blue-600 text-white font-semibold py-2 px-4 w-36 md:w-auto">
              Dashboard
            </button>
            <button className="bg-transparent border-2 border-[#3490dc] text-[#3490dc] font-semibold py-[6px] px-4 w-36 md:w-auto">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div
        className={`bg-[#3490dc] py-[10px] mt-2 ${
          isMenuOpen ? "block" : "hidden md:flex"
        }`}
      >
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10 lg:px-12 xl:px-0">
          <ul
            className={`flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-white`}
          >
            <li>
              <a
                href="https://etutorclass.com/"
                className="hover:text-blue-200"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="https://etutorclass.com/courses"
                className="hover:text-blue-200"
              >
                Courses
              </a>
            </li>
            <li>
              <a
                href="https://etutorclass.com/courses/public-exams"
                className="hover:text-blue-200"
              >
                Exam Hall
              </a>
            </li>
            <li>
              <a
                href="https://etutorclass.com/courses/digital-library"
                className="hover:text-blue-200"
              >
                Pustak Sewa
              </a>
            </li>

            {/* Dropdown for Notice */}
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex gap-1 items-center">
                  Notice
                  <IoMdArrowDropdown size={14} />{" "}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="absolute -left-8 w-fit">
                  <DropdownMenuItem>
                    <Link href="https://etutorclass.com/results">
                      Exam Results
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="https://etutorclass.com/study-materials"
                      className="w-28"
                    >
                      Study Materials
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="https://etutorclass.com/syllabus">
                      Syllabus
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <a
                href="https://etutorclass.com/tutors"
                className="hover:text-blue-200"
              >
                Find Tutors
              </a>
            </li>
            <li>
              <a
                href="https://etutorclass.com/successful-student-achievements"
                className="hover:text-blue-200"
              >
                Achievements
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
