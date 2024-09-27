"use client";
import React, { useEffect, useState } from "react";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { exams } from "@/examData";
import { Pen, X } from "lucide-react";
import Link from "next/link";

const Register = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [interestedExams, setInterestedExams] = useState([]);
  const [direction, setDirection] = useState("next");

  const nextStep = () => {
    setDirection("next");
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setDirection("back");
    setStep((prev) => prev - 1);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    setValue,
  } = useForm();

  const router = useRouter();

  const resizeImage = (base64Str, maxWidth, maxHeight) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = maxWidth;
        canvas.height = maxHeight;
        ctx.drawImage(img, 0, 0, maxWidth, maxHeight);

        canvas.toBlob((blob) => {
          resolve(blob);
        }, "image/jpeg");
      };
    });
  };
  const onSubmitStep1 = async (data) => {
    setIsSubmitting(true);
    try {
      if (data.password != data.confirmPassword) {
        setError("confirmPassword", {
          type: "validate",
          message: "Confirm Password do not match with Passwords",
        });
        return;
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/checkemail`,
        data
      );
      if (response.status == 200) setStep(2);
      else if (response.status == 409) {
        toast.error("Email Already Exists");
      }
    } catch (error) {
      if (error.message == "Network Error") {
        toast.error("Error Connecting to the Server");
        return;
      }
      if (error.response.data) {
        toast.error(error.response.data);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitStep2 = (data) => {
    setStep(3);
  };

  const onSubmitStep3 = async (data) => {
    if (!data.interests || data.interests.length === 0) {
      setError("interests", { message: "Select atleast one field" });
      return;
    }
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("name", data.name);

    if (croppedImage) {
      const resizedBlob = await resizeImage(croppedImage, 200, 200);
      formData.append("profilePicture", resizedBlob, "profilePicture.jpg");
    }
    if (Array.isArray(data.interests)) {
      data.interests.forEach((interest, index) => {
        formData.append(`interests[${index}]`, interest);
      });
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/signup`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status == 200) {
        toast.success("User Created Successfully");
        router.push("/");
      }
    } catch (error) {
      if (error.message == "Network Error") {
        toast.error("Error Connecting to the Server");
        return;
      }
      if (error.response.data.data) {
        toast.error(error.response.data);
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

  const handleCheckboxChange = (exam) => {
    setError("interests", null);
    setInterestedExams((prev) => {
      const updatedExams = prev.includes(exam)
        ? prev.filter((item) => item !== exam)
        : [...prev, exam];
      setValue("interests", updatedExams);
      return updatedExams;
    });
  };

  const variants = {
    hidden: {
      x: direction === "next" ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.3 },
    },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: {
      x: direction === "next" ? -100 : 100,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  useEffect(() => {
    register("interests");
  }, []);

  return (
    <div className="h-[80vh] w-full flex flex-col items-center justify-center">
      <div className="border mt-4 rounded-xl py-4 p-2 md:p-6 overflow-hidden">
        <h3 className="text-3xl text-green font-bold text-center text-primary duration-300 ">
          Create Account
        </h3>
        <form
          onSubmit={handleSubmit(
            step === 1
              ? onSubmitStep1
              : step === 2
              ? onSubmitStep2
              : onSubmitStep3
          )}
          className="flex flex-col p-3 mt-4 w-full sm:w-96 mx-auto "
        >
          <motion.div
            key={step} // Ensures that Framer Motion knows each step is distinct
            custom={direction}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
          >
            {step === 1 && (
              <>
                <div className=" w-full mb-3">
                  <label className=" text-sm font-semibold mt-4 mb-2">
                    Email
                  </label>
                  <input
                    {...register("email", { required: "Email is Required" })}
                    placeholder="Email"
                    type="email"
                    className="p-3 text-sm w-full mt-1  ring-1 ring-[#000] ring-opacity-20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
                  />
                  {errors.email && (
                    <p className="text-incorrect text-xs mt-1">
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
                    placeholder="Password"
                    type="password"
                    className="p-3 text-sm w-full mt-1  ring-1 ring-[#000] ring-opacity-20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
                  />
                  {errors.password && (
                    <p className="text-incorrect text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className=" w-full mb-3">
                  <label className=" text-sm font-semibold mt-6 mb-2">
                    Confirm Password
                  </label>
                  <input
                    {...register("confirmPassword", {
                      required: "Confirm Password is Required",
                      minLength: {
                        value: 8,
                        message: "Password must be minimum 8 characters",
                      },
                    })}
                    placeholder="Password"
                    type="password"
                    className="p-3 text-sm w-full mt-1  ring-1 ring-[#000] ring-opacity-20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
                  />
                  {errors.confirmPassword && (
                    <p className="text-incorrect text-xs mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <Button
                  variant="contained"
                  type="submit"
                  className="mt-4 bg-primary disabled:opacity-80 w-full text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Verifying..." : "Next"}
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
                    placeholder="Name"
                    className="p-3 text-sm w-full mt-1  ring-1 ring-[#000] ring-opacity-20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
                  />
                  {errors.name && (
                    <p className="text-incorrect text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                  <div className="mt-6" />
                  <label className="text-sm font-semibold  text-black">
                    Profile Picture{" "}
                    <span className="text-xs text-muted-foreground">
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
                        onClick={() =>
                          document.getElementById("fileInput").click()
                        }
                        className="p-2 text-xs w-32 mt-1 ring-1 ring-[#000] ring-opacity-20 rounded-lg shadow-sm  "
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
                    <Dialog className="w-full flex justify-center">
                      <div className="relative w-fit group mx-auto">
                        <img
                          src={croppedImage}
                          alt=""
                          className="w-32 h-32 border  rounded-full mx-auto"
                        />
                        <DialogTrigger className=" border border-primary  rounded-full p-2 duration-300 bg-white  absolute bottom-0 left-3/4 ">
                          <Pen size={10} />
                        </DialogTrigger>
                        <button
                          type="button"
                          className=" border  rounded-full p-1 duration-300 bg-incorrect text-white absolute top-0 left-3/4"
                          onClick={() => setSelectedImage(null)}
                        >
                          <X size={15} />
                        </button>
                      </div>
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

                <div className="flex justify-between mt-4 items-center">
                  <Button
                    variant="link"
                    onClick={() => {
                      setStep(1);
                    }}
                  >
                    {"<< "}Back
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className=" bg-primary text-white"
                  >
                    Next {" >>"}
                  </Button>
                </div>
              </>
            )}

            {step == 3 && (
              <div>
                <h1 className="font-semibold text-lg">
                  What are your Interests?{" "}
                  <span className="text-muted-foreground font-light text-xs">
                    (Select Atleast One)
                  </span>{" "}
                </h1>
                {errors.interests && (
                  <p className="text-incorrect text-xs mt-1">
                    {errors.interests.message}
                  </p>
                )}
                <div className=" mt-4 space-y-2">
                  {exams.map((exam) => (
                    <div key={exam.exam_id} className="flex gap-1">
                      <input
                        type="checkbox"
                        id={exam.exam_id}
                        name={exam.exam_id}
                        value={exam.exam_id}
                        checked={interestedExams.includes(exam.exam_id)}
                        onChange={() => handleCheckboxChange(exam.exam_id)}
                      />
                      <label htmlFor={exam.exam_id}>{exam.name}</label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4">
                  <Button
                    variant="link"
                    onClick={() => {
                      setStep(2);
                    }}
                    className="text-primary"
                  >
                    {"<< "}Back
                  </Button>
                  <Button
                    className="text-white "
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Register
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </form>
        <p className="text-xs py-2 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
