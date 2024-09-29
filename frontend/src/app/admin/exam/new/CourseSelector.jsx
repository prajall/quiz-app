"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import CourseSelector from "./CourseSelector";

export default function ExamForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      exam_id: "1011",
      title: "",
      price: "",
      discount: "",
      subTitle: "",
      courses: [], // Initialize courses array
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log("Submitted data:", data);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/exam`,
        data
      );
      console.log(response);
      if (!response.status === 200) {
        throw new Error("Failed to add exam");
      }

      toast.success("Exam added successfully");
      form.reset();
    } catch (error) {
      console.log(error);
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onCourseSelect = (value) => {
    form.setValue("courses", value);
  };

  return (
    <div className="mx-auto mt-10 px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className=" p-6">
          <h2 className="text-3xl font-bold ">Add New Exam</h2>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 space-y-6"
          >
            <FormField
              className="w-full"
              control={form.control}
              name="title"
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Title</FormLabel>
                  <FormControl>
                    <Input {...field} className="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              className="w-full"
              control={form.control}
              name="subTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Subtitle</FormLabel>
                  <FormControl>
                    <Input {...field} className="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="price"
                rules={{
                  required: "Price is required",
                  validate: (value) =>
                    Number(value) >= 0 || "Price must be a positive number",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Price</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" className="" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discount"
                rules={{
                  validate: (value) =>
                    !value ||
                    Number(value) >= 0 ||
                    "Discount must be a positive number",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">
                      Discount (Rs){" "}
                      <span className="text-muted-foreground text-xs">
                        (optional)
                      </span>{" "}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="number" className="" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="courses"
              rules={{ required: "Courses is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Select Courses</FormLabel>
                  <FormControl>
                    <CourseSelector onCourseSelect={onCourseSelect} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-primary text-white hover:bg-primary-dark"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Exam"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
