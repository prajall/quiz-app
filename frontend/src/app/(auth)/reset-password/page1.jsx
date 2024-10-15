"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

const Register = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationCodeState, setVerificationCodeState] = useState();
  const [direction, setDirection] = useState("next");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    setValue,
  } = useForm();

  const router = useRouter();

  const onSubmitStep1 = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/register-code`,
        data
      );
      if (response.status == 200) {
        toast.success("Verification code sent");
        setStep(2);
      }
      if (response.status == 400) {
        setError("email", {
          type: "validate",
          message: "Email not found",
        });
      }
    } catch (error) {
      if (error.message == "Network Error") {
        toast.error("Error Connecting to the Server");
        return;
      }
      toast.error("Failed to send OTP");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitStep2 = async (data) => {
    console.log(data);
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/verify-code`,
        data
      );
      if (response.status == 200) {
        toast.success("Verified");
        setStep(3);
      }
    } catch (error) {
      console.log(error);
      if (error.message == "Network Error") {
        toast.error("Error Connecting to the Server");
        return;
      } else if (error.response.status == 400) {
        setError("verificationCode", {
          type: "validate",
          message: "Invalid Verification Code",
        });
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitStep3 = async (data) => {
    console.log(data);
    setIsSubmitting(true);
    try {
      if (data.newPassword != data.confirmNewPassword) {
        setError("confirmNewPassword", {
          type: "validate",
          message: "Passwords donot match",
        });
        setError("newPassword", {
          type: "validate",
          message: "Passwords donot match",
        });
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/reset-password`,
        data
      );
      if (response.status == 200) {
        toast.success("Password Changed Successfully");
        router.push("/login");
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      if (error.message == "Network Error") {
        toast.error("Error Connecting to the Server");
        return;
      } else if (error.response?.data) {
        toast.error(error.response.data);
      } else if (error.response.status === 500) {
        toast.error("Internal Server Error");
      } else if (error.response) {
        toast.error("Failed to Reset Password");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsSubmitting(false);
    }
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
    if (step == 2) {
      register("verificationCode");
    }
  }, [step]);

  return (
    <div className="h-[80vh] w-full flex flex-col items-center justify-center">
      <div className="border mt-4 rounded-xl py-4 p-2 md:p-6 overflow-hidden">
        <h3 className="text-3xl text-green font-bold text-center text-primary duration-300 ">
          Reset Password
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
          {step === 1 && (
            <>
              <div className=" w-full mb-3">
                <p className="text-sm text-justify mb-4 text-black text-muted-foreground">
                  Enter your email address linked with QuizPro to receive a
                  verification code.
                </p>

                <label className=" text-sm font-semibold mb-2">Email</label>
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

              <Button
                variant="contained"
                type="submit"
                className="mt-4 bg-primary disabled:opacity-80 w-full text-white"
                disabled={isSubmitting}
              >
                Send Verification Code
              </Button>
            </>
          )}
          <motion.div
            key={step} // Ensures that Framer Motion knows each step is distinct
            custom={direction}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
          >
            {step === 2 && (
              <>
                <div className=" w-full mb-3">
                  <p className="text-sm mb-4 text-black text-muted-foreground">
                    Enter the 6-digit Verification Code that has been sent to
                    your mail
                  </p>

                  {/* <label className=" text-sm font-semibold mt-6 mb-2">
                    Verification Code
                  </label> */}
                  {/* <input
                    {...register("verificationCode", {
                      required: "Verification Code is Required",
                      minLength: {
                        value: 6,
                        message: "Verification Code must be 6 digit",
                      },
                      maxLength: {
                        value: 6,
                        message: "Verification Code must be 6 digit",
                      },
                    })}
                    placeholder="6 digit Verification Code"
                    className="p-3 text-sm w-full mt-1  ring-1 ring-[#000] ring-opacity-20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
                  /> */}
                  <div className="my-5">
                    <InputOTP
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                      value={verificationCodeState}
                      onChange={(value) => {
                        setVerificationCodeState(value);
                        setValue("verificationCode", value);
                      }}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                    {errors.verificationCode && (
                      <p className="text-incorrect text-xs mt-1">
                        {errors.verificationCode.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between mt-4 items-center">
                  <Button
                    variant="primary"
                    type="submit"
                    className=" bg-primary w-full text-white"
                    disabled={isSubmitting}
                  >
                    Verify
                  </Button>
                </div>
                <div className="my-1">
                  <p className="text-xs text-center text-opacity-80">
                    Didn't recieve the code?{" "}
                    <Button
                      variant="link"
                      className="p-0 text-xs"
                      onClick={() => {
                        onSubmitStep1({ email: watch("email") });
                      }}
                      type="button"
                      disabled={isSubmitting}
                    >
                      Resend Code
                    </Button>{" "}
                  </p>
                </div>
                {/* </motion.div> */}
              </>
            )}

            {step == 3 && (
              <>
                <div className=" w-full mb-3">
                  <p className="text-sm mb-4 text-black text-muted-foreground">
                    Create a new password
                  </p>
                  <label className=" text-sm font-semibold mt-6 mb-2">
                    New Password
                  </label>
                  <input
                    {...register("newPassword", {
                      required: "New Password is Required",
                      minLength: {
                        value: 8,
                        message: "New Password must be minimum 8 characters",
                      },
                    })}
                    placeholder="Password"
                    type="password"
                    className="p-3 text-sm w-full mt-1  ring-1 ring-[#000] ring-opacity-20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
                  />
                  {errors.newPassword && (
                    <p className="text-incorrect text-xs mt-1">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>
                <div className=" w-full mb-3">
                  <label className=" text-sm font-semibold mt-6 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    {...register("confirmNewPassword", {
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
                  {errors.confirmNewPassword && (
                    <p className="text-incorrect text-xs mt-1">
                      {errors.confirmNewPassword.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-between mt-4 items-center">
                  <Button
                    variant="primary"
                    type="submit"
                    className=" bg-primary w-full text-white"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default Register;
