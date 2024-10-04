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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CourseSelector from "../components/CourseSelector";

export default function EditExamForm({ params }) {
  const { examId } = params;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      exam_id: "",
      title: "",
      price: "",
      discount: "",
      subTitle: "",
      courses: [],
    },
  });

  useEffect(() => {
    const fetchExamDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/exam/${examId}`
        );
        if (response.status == 200) {
          const examData = response.data;
          form.reset({
            exam_id: examData.exam_id,
            title: examData.title,
            price: examData.price,
            discount: examData.discount,
            subTitle: examData.subTitle,
            courses: examData.courses,
          });
        }
      } catch (error) {
        console.error("Error fetching exam details:", error);
        toast.error("Failed to fetch exam details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExamDetails();
  }, [examId]);

  // Update exam on form submit
  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      // Prepare courses array for the PATCH request
      const courseIds = data.courses.map((course) => course.id.toString());

      const dataPayload = {
        ...data,
        courses: courseIds, // Make sure courses is an array of IDs
      };

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/exam/${examId}`,
        dataPayload
      );

      if (!response.status === 200) {
        throw new Error("Failed to update exam");
      }
      toast.success("Exam updated successfully");
      router.push(`/exam/${examId}`); // Redirect to exam page
    } catch (error) {
      console.error("Error updating exam:", error);
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeCourses = (value) => {
    console.log("Selected Course: ", value);
    form.setValue("courses", value);
  };

  return (
    <div className="mx-auto py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden">
        <div className=" py-6">
          <h2 className="text-3xl font-bold ">Edit Exam</h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              className="w-full md:w-1/2"
              control={form.control}
              name="title"
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Title</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col md:flex-row gap-6 w-full">
              <FormField
                className="w-full md:w-1/2"
                control={form.control}
                name="subTitle"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="">Subtitle</FormLabel>
                    <FormControl>
                      <Input {...field} className="" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className="w-full md:w-1/2"
                control={form.control}
                name="exam_id"
                rules={{ required: "Exam Id is required" }}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="">Exam Id</FormLabel>
                    <FormControl>
                      <Input {...field} className="" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
            <div className="">
              <h3 className="text-sm">Courses:</h3>
              <CourseSelector
                onChangeCourses={onChangeCourses}
                selectedCourses={form.watch("courses")}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-white hover:bg-primary"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Exam"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
