"use client";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/contexts/AppContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Login = () => {
  const { appData, setAppData } = useContext(AppContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const router = useRouter();
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status >= 200) {
        toast.success("Logged in successfully");
        setAppData((prev) => ({ ...prev, user: response.data }));
        router.push("/quiz");
      } else {
        throw new Error("Login Error");
      }
    } catch (error) {
      if (error.message == "Network Error") {
        toast.error("Error Connecting to the Server");
        return;
      }
      if (error.response.status === 404) {
        setError("email", { message: "User not found" });
      }
      if (error.response.data === "Incorrect Password") {
        setError("password", { message: "Incorrect Password" });
      }
      if (error.response.data) {
        toast.error(error.response.data);
      } else {
        toast.error("Something Went Wrong");
      }
      console.log("eror logging in: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (appData.user) {
      router.push("/");
    }
  }, []);

  return (
    <div className="h-[80vh] w-full flex flex-col items-center justify-center">
      <div className="border mt-4 rounded-xl w-full max-w-96 sm:max-w-fit sm:w-fit py-4 p-2 md:p-6 ">
        <h3 className="text-3xl mb-2 text-green font-bold text-center ">
          Welcome Back,
        </h3>
        <p className="text-lg text-center text-opacity-80">Login to Continue</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-3 mt-4 w-full sm:w-96 mx-auto"
        >
          <div className="relative w-full mb-3">
            <label className=" text-sm  mt-2 mb-3">Email</label>
            <input
              {...register("email", {
                required: "Email is Required",
              })}
              placeholder="email@example.com"
              className="p-3 text-sm w-full mt-1  ring-1 ring-[#000] ring-opacity-20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
              type="email"
            />
            {errors.email && (
              <p className="text-incorrect text-sm mt-1 mb-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="relative w-full mb-3">
            <label className=" text-sm  mt-2">Password</label>
            <input
              {...register("password", {
                required: "Password is Required",
                minLength: {
                  value: 8,
                  message: "Password must be minimum 8 characters",
                },
              })}
              type="password"
              placeholder="xxxxxxxx"
              className="p-3 text-sm w-full mt-1  ring-1 ring-[#000] ring-opacity-20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
            />
            {errors.password && (
              <p className="text-incorrect text-sm mt-1 ">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex justify-between mt-3">
            <div className="flex  gap-1 ">
              <input {...register("rememberMe")} type="checkbox" />
              <label className="text-sm ">Remember me</label>
            </div>
            <Link href="/reset-password" className="text-sm hover:underline ">
              Forgot Password ?
            </Link>
          </div>
          <Button
            variant="contained"
            type="submit"
            className="mt-4 bg-primary text-white py-3 rounded-lg disabled:opacity-80"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Login..." : "Login"}
          </Button>
        </form>
        <p className="text-xs py-2 text-center">
          New to QuizPro?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
