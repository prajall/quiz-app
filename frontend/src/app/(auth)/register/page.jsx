"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Register = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const router = useRouter();

  const onSubmitStep1 = (data) => {
    console.log("Step 1 data:", data);
    setStep(2);
  };

  const onSubmitStep2 = async (data) => {
    setIsSubmitting(true);
    console.log("Step 2 data:", data);
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    console.log(formData);
    if (data.profilePicture[0]) {
      formData.append("profilePicture", data.profilePicture[0]);
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/user/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      if (response.status == 200) {
        toast.success("User Created Successfully");
        router.push("/");
      }
    } catch (error) {
      if (error.response.message) {
        toast.error(error.resonse.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
      console.error("Register error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-14">
      <h3 className="text-3xl mb-2 text-green font-bold text-center ">
        {step === 1 ? "Create Account" : "Step 2"}
      </h3>
      <form
        onSubmit={handleSubmit(step === 1 ? onSubmitStep1 : onSubmitStep2)}
        className="flex flex-col p-3 max-w-96 mx-auto"
      >
        {step === 1 && (
          <>
            <div className="relative w-full mb-3">
              <label className=" text-sm font-semibold mt-4 mb-2">Email</label>
              <input
                {...register("email", { required: "Email is Required" })}
                type="email"
                className="p-2 w-full mt-1 bg-gray ring-1 ring-[#000] ring-opacity-20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
              />
              {errors.email && (
                <p className="text-incorrect text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="relative w-full mb-3">
              <label className=" text-sm font-semibold mt-4 mb-2">
                Password
              </label>
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
                <p className="text-incorrect text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button variant="contained" type="submit" className="mt-4">
              Next
            </Button>
          </>
        )}
        {step === 2 && (
          <>
            <div className="relative w-full mb-3">
              <label className=" text-sm font-semibold mt-4 mb-2">
                Your Name
              </label>
              <input
                {...register("name", { required: "Name is Required" })}
                type="text"
                className="p-2 w-full mt-1 bg-gray ring-1 ring-[#000] ring-opacity-20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
              />
              {errors.name && (
                <p className="text-incorrect text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
              <label className=" text-sm font-semibold mt-4 mb-2">
                Profile Picture{" "}
                <span className="text-xs text-opacity-70">(optional)</span>
              </label>
              <input
                {...register("profilePicture")}
                type="file"
                className="p-2 w-full mt-1 bg-gray ring-1 ring-[#000] ring-opacity-20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
              />
            </div>
            <div className="flex justify-between mt-4">
              <Button
                variant="contained"
                onClick={() => setStep(1)}
                className="mt-4"
              >
                Back
              </Button>
              <Button
                variant="contained"
                disabled={isSubmitting}
                type="submit"
                className="mt-4"
              >
                Submit
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Register;
