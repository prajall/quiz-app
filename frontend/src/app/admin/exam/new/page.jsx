"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const AddExamForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${NEXT_PUBLIC_API_URL}/exam`, data, {
        withCredentials: true,
      });
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Add New Exam</CardTitle>
        <CardDescription>
          Fill in the details below to add a new exam to the system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="exam_id">Exam ID</Label>
            <Input
              id="exam_id"
              type="text"
              {...register("exam_id", { required: true })}
            />
            {errors.exam_id && (
              <p className="text-red-500 text-sm">Exam ID is required</p>
            )}
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">Name is required</p>
            )}
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              {...register("price", { required: true })}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">Price is required</p>
            )}
          </div>
          <div>
            <Label htmlFor="discount">Discount (optional)</Label>
            <Input id="discount" type="number" {...register("discount")} />
          </div>
        </form>
      </CardContent>
      <CardFooter className="pt-4">
        <Button type="submit" loading={loading} className="w-full">
          Add Exam
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddExamForm;
