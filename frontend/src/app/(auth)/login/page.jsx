"use client";
import { Button } from "@mui/material";
import React from "react";
import { useForm, useWatch } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = axios.post("http:localhost:3001/user/login", { data });
    console.log(response);
  };

  return (
    <div className="mt-14">
      <h3 className="text-3xl mb-2 text-green font-bold text-center ">
        Welcome Back,
      </h3>
      <p className="text-lg text-center">Login to Continue</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-3 max-w-96 mx-auto"
      >
        <div className="relative w-full mb-3">
          <label className=" text-sm font-semibold mt-4 mb-2">Phone</label>
          <input
            {...register("email", {
              required: "Email is Required",
            })}
            type="email"
            className="p-2 w-full mt-1 bg-gray ring-1 ring-[#000] ring-opacity-20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
          />
          {errors.username && (
            <p className="text-red text-sm mt-1">{errors.username.message}</p>
          )}
        </div>
        <div className="relative w-full mb-3">
          <label className=" text-sm font-semibold mt-4 mb-2">Password</label>
          <input
            {...register("password", {
              required: "Password is Required",
              minLength: {
                value: 8,
                message: "Password must be minimum 8 characters",
              },
            })}
            type="password"
            className="p-2 w-full mt-1 bg-gray ring-1 ring-[#000] ring-opacity-20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
          />
          {errors.password && (
            <p className="absolute text-red text-sm mt-1 ">
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
        <Button variant="contained" type="submit" className="mt-4">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
