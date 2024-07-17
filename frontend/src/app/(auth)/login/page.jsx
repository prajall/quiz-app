"use client";
import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/user/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status >= 200) {
        console.log("login successful");
        router.push("/quiz");
      } else {
        throw new Error("Login Error");
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
      console.log("eror logging in: ", error);
    }
  };

  return (
    <div className="mt-14">
      <h3 className="text-3xl mb-2 text-green font-bold text-center ">
        Welcome Back,
      </h3>
      <p className="text-lg text-center text-opacity-80">Login to Continue</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-3 max-w-96 mx-auto"
      >
        <div className="relative w-full mb-3">
          <label className=" text-sm  mt-2 mb-3">Email</label>
          <input
            {...register("email", {
              required: "Email is Required",
            })}
            className="px-4 py-3 text-sm w-full mt-1 bg-gray bg-opacity-60 ring-1 ring-[#000] ring-opacity-20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
            type="email"
          />
          {errors.email && (
            <p className="text-incorrect text-sm mt-1 mb-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="relative w-full mb-3">
          <label className=" text-sm  mt-2 mb-3">Password</label>
          <input
            {...register("password", {
              required: "Password is Required",
              minLength: {
                value: 8,
                message: "Password must be minimum 8 characters",
              },
            })}
            type="password"
            className="px-4 py-3 text-sm  w-full mt-1 bg-gray bg-opacity-60 ring-1 ring-[#000] ring-opacity-20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
          />
          {errors.password && (
            <p className="absolute text-incorrect text-sm mt-1 mb-1 ">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex  gap-1 ">
            <input {...register("rememberMe")} type="checkbox" />
            <label className="text-sm ">Remember me</label>
          </div>
          <a href="#" className="text-sm hover:underline ">
            Forgot Password ?
          </a>
        </div>
        <button
          variant="contained"
          type="submit"
          className="mt-4 bg-primary text-white py-3 rounded-lg "
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
