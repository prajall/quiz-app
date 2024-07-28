"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ImageCropper from "./components/ImageCropper";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Register = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
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
    console.log("croppedImage: ", croppedImage);
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("name", data.name);
    if (croppedImage) {
      const blob = await (await fetch(croppedImage)).blob();
      formData.append("profilePicture", blob, "profilePicture.jpg");
    }
    console.log(formData);

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
      console.log(error);
      if (error.response) {
        toast.error(error.response.data);
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

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        setCroppedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitCroppedImage = (croppedImage) => {
    setCroppedImage(croppedImage);
  };

  return (
    <div className="h-[80vh] w-full flex flex-col items-center justify-center">
      <h3 className="text-3xl mb-6 text-green font-bold text-center text-primary ">
        Create Account
      </h3>
      <form
        onSubmit={handleSubmit(step === 1 ? onSubmitStep1 : onSubmitStep2)}
        className="flex flex-col p-3 w-full sm:w-96 mx-auto"
      >
        {step === 1 && (
          <>
            <div className=" w-full mb-3">
              <label className=" text-sm font-semibold mt-4 mb-2">Email</label>
              <input
                {...register("email", { required: "Email is Required" })}
                type="email"
                className="p-3 text-sm w-full mt-1  ring-1 ring-[#000] ring-opacity-20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
              />
              {errors.email && (
                <p className="text-incorrect text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className=" w-full mb-3">
              <label className=" text-sm font-semibold mt-6 mb-2">
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
                className="p-3 text-sm w-full mt-1  ring-1 ring-[#000] ring-opacity-20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
              />
              {errors.password && (
                <p className="text-incorrect text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              variant="contained"
              type="submit"
              className="mt-4 bg-primary text-white"
            >
              Next
            </Button>
          </>
        )}
        {step === 2 && (
          <>
            <div className="relative w-full">
              <label className="text-sm font-semibold mt-4 mb-2 text-black">
                Your Name
              </label>
              <input
                {...register("name", { required: "Name is Required" })}
                type="text"
                className="p-3 text-sm w-full mt-1  ring-1 ring-[#000] ring-opacity-20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
              />
              {errors.name && (
                <p className="text-secondary text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
              <label className="text-sm font-semibold mt-6 text-black">
                Profile Picture{" "}
                <span className="text-xs text-gray text-opacity-70">
                  (optional)
                </span>
              </label>
              <input
                {...register("profilePicture")}
                onChange={onImageChange}
                type="file"
                id="fileInput"
                className="hidden"
              />
              {!selectedImage && (
                <div className="my-1">
                  <button
                    type="button"
                    onClick={() => document.getElementById("fileInput").click()}
                    className="p-1 text-xs w-32 mt-1 ring-1 ring-[#000] ring-opacity-20 rounded-lg shadow-sm  "
                  >
                    Upload Image
                  </button>
                </div>
              )}
              {selectedImage && (
                <p className="mt-2 text-sm text-gray-600">
                  {selectedImage.name}
                </p>
              )}
            </div>
            {selectedImage && (
              <>
                <Dialog>
                  <DialogTrigger>
                    <img
                      src={croppedImage}
                      alt=""
                      className="w-32 h-32 rounded-full"
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Crop Image</DialogTitle>
                    </DialogHeader>
                    <ImageCropper
                      selectedImage={selectedImage}
                      onSubmitCroppedImage={onSubmitCroppedImage}
                    />
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button
                          type="button"
                          variant="secondary"
                          className="bg-primary text-white"
                        >
                          Crop
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            )}

            <div className="flex justify-between mt-4">
              <Button
                variant="contained"
                onClick={() => setStep(1)}
                className="mt-4 bg-secondary text-white"
              >
                Back
              </Button>
              <Button
                variant="contained"
                disabled={isSubmitting}
                type="submit"
                className="mt-4 bg-primary text-white"
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
