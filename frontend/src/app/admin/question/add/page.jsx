"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { toast } from "react-toastify";
import { examIdToName, exams } from "@/examData";

export default function QuestionForm() {
  const [imagePreviews, setImagePreviews] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState({
    question: null,
    opt_A: null,
    opt_B: null,
    opt_C: null,
    opt_D: null,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    setError,
    reset,
  } = useForm({
    defaultValues: {
      question: {
        name: "This is a Test Question for testing the question form",
        image: null,
      },
      description: "Description for the test question",
      opt_A: {
        name: "Option A for the test question",
        image: null,
      },
      opt_B: {
        name: "Option B for the test question",
        image: null,
      },
      opt_C: {
        name: "Option C for the test question",
        image: null,
      },
      opt_D: {
        name: "Option D for the test question",
        image: null,
      },
      opt_correct: "B",
      exam_id: "1001",
    },
  });

  const questionImage = watch("question.image");
  const optAImage = watch("opt_A.image");
  const optBImage = watch("opt_B.image");
  const optCImage = watch("opt_C.image");
  const optDImage = watch("opt_D.image");

  useEffect(() => {
    const updateImagePreview = (key, fileList) => {
      if (fileList && fileList.length > 0) {
        const file = fileList[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews((prev) => ({ ...prev, [key]: reader.result }));
          setImages((prev) => ({ ...prev, [key]: file }));
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreviews((prev) => {
          const newPreviews = { ...prev };
          delete newPreviews[key];
          return newPreviews;
        });
        setImages((prev) => ({ ...prev, [key]: null }));
      }
    };

    updateImagePreview("question", questionImage);
    updateImagePreview("opt_A", optAImage);
    updateImagePreview("opt_B", optBImage);
    updateImagePreview("opt_C", optCImage);
    updateImagePreview("opt_D", optDImage);
  }, [questionImage, optAImage, optBImage, optCImage, optDImage]);

  const onSubmit = async (data) => {
    console.log("Data: ", data);
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      const validImageTypes = ["image/jpeg", "image/jpg", "image/png"];

      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            if (subKey === "image") {
              if (images[key]) {
                if (!validImageTypes.includes(images[key].type)) {
                  setError(`${key}.image`, {
                    type: "manual",
                    message:
                      "Invalid image type. Only JPEG,JPG and PNG are allowed.",
                  });
                } else {
                  formData.append(`${key}Image`, images[key]);
                }
              }
            } else {
              formData.append(`${key}`, String(subValue));
            }
          });
        } else {
          formData.append(key, String(value));
        }
      });

      console.log("Form Data:", Object.fromEntries(formData));

      await toast.promise(
        axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/question/add`,
          formData,
          {
            headers: {
              apiKey: 123456789,
            },
            withCredentials: true,
          }
        ),
        {
          pending: "Submitting your question...",
          success: "Question added successfully",
          error: {
            render({ data }) {
              if (data.message === "Network Error") {
                return "Failed to connect to the server";
              } else if (data.response?.data) {
                return data.response.data.message;
              } else {
                return "Something went wrong";
              }
            },
          },
        }
      );

      reset();
    } catch (error) {
      console.error(error);
      // Since toast.promise handles the error, we don't need additional error toasts here
    } finally {
      setIsSubmitting(false);
    }
  };

  const ImagePreview = ({ src, onRemove }) => (
    <div className="mt-2 relative w-fit">
      <img
        src={src}
        alt="Preview"
        className="max-w-full h-auto max-h-40 rounded-md"
      />
      <Button
        variant="destructive"
        className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center p-0"
        onClick={onRemove}
      >
        <X size={14} />
      </Button>
    </div>
  );

  const removeImage = (key) => {
    setImagePreviews((prev) => {
      const newPreviews = { ...prev };
      delete newPreviews[key];
      return newPreviews;
    });
    setImages((prev) => ({ ...prev, [key]: null }));
    setValue(`${key}.image`, null);
  };

  return (
    <Card className="w-full px-0 mx-auto bg-white text-black border-none">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-bold text-primary">
          Add New Question
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <form
          id="question-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="">
            <Label
              className="font-semibold text-md text-primary "
              htmlFor="question.name"
            >
              Question:
            </Label>
            <Textarea
              id="question.name"
              {...register("question.name", {
                required: "Question is required",
              })}
              className="bg-white text-black mt-1"
            />
            {errors.question?.name && (
              <p className="text-red-500">{errors.question.name.message}</p>
            )}

            <Input
              id="question.image"
              type="file"
              accept="image/*"
              {...register("question.image")}
              className="bg-white text-black hidden"
            />
            {!imagePreviews.question && (
              <Button
                variant="outline"
                className="bg-white flex items-center justify-center gap-1 text-black mt-1"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("question.image").click();
                }}
              >
                <ImagePlus size={15} />
                Add Image
              </Button>
            )}
            {imagePreviews.question && (
              <ImagePreview
                src={imagePreviews.question}
                onRemove={() => removeImage("question")}
              />
            )}
          </div>

          <div>
            <Label
              className="font-semibold text-md text-primary "
              htmlFor="description"
            >
              Description:
            </Label>
            <Textarea
              id="description"
              {...register("description", {
                maxLength: {
                  value: 1000,
                  message: "Description cannot exceed 1000 characters",
                },
              })}
              maxLength={1000}
              className="bg-white text-black mt-1"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["A", "B", "C", "D"].map((option) => (
              <div key={option} className="space-y-2">
                <Label
                  className="font-semibold text-md text-primary"
                  htmlFor={`opt_${option}.name`}
                >
                  Option {option}
                </Label>
                <Textarea
                  id={`opt_${option}.name`}
                  {...register(`opt_${option}.name`, {
                    required: `Option ${option} is required`,
                  })}
                  className="bg-white text-black"
                />
                {errors[`opt_${option}`]?.name && (
                  <p className="text-red-500">
                    {errors[`opt_${option}`]?.name?.message}
                  </p>
                )}

                <Input
                  id={`opt_${option}.image`}
                  type="file"
                  accept="image/*"
                  {...register(`opt_${option}.image`)}
                  className="bg-white text-black hidden"
                />
                {!imagePreviews[`opt_${option}`] && (
                  <Button
                    variant="outline"
                    className=" flex items-center justify-center gap-1 text-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(`opt_${option}.image`).click();
                    }}
                  >
                    <ImagePlus size={15} />
                    Add Image
                  </Button>
                )}

                {imagePreviews[`opt_${option}`] && (
                  <ImagePreview
                    src={imagePreviews[`opt_${option}`]}
                    onRemove={() => removeImage(`opt_${option}`)}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col w-full md:w-1/2 gap-1">
              <Label
                className="font-semibold text-md text-primary"
                htmlFor="exam_id"
              >
                Exam Category:
              </Label>
              <Controller
                name="exam_id"
                control={control}
                rules={{ required: "Exam ID is required" }}
                render={({ field }) => {
                  return (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="bg-white text-black w-full mt-1">
                        <SelectValue placeholder="Select Exam Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {exams.map((exam) => (
                          <SelectItem key={exam.exam_id} value={exam.exam_id}>
                            {exam.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  );
                }}
              />

              {errors.exam_id && (
                <p className="text-red-500">{errors.exam_id.message}</p>
              )}
            </div>

            <div className="flex flex-col w-full md:w-1/2 gap-1">
              <Label
                className="font-semibold text-md text-primary"
                htmlFor="opt_correct"
              >
                Correct Option:
              </Label>
              <Controller
                name="opt_correct"
                control={control}
                rules={{ required: "Correct option is required" }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="bg-white text-black w-full mt-1">
                      <SelectValue placeholder="Select Correct Option" />
                    </SelectTrigger>
                    <SelectContent>
                      {["A", "B", "C", "D"].map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.opt_correct && (
                <p className="text-red-500">{errors.opt_correct.message}</p>
              )}
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="default"
                disabled={isSubmitting}
                className="w-full flex items-center gap-1"
              >
                {isSubmitting && <Spinner />}
                Submit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl overflow-auto w-full max-h-[90vh] flex flex-col">
              <DialogHeader>
                <DialogTitle className=" ">
                  Confirm Submit Question ?
                </DialogTitle>
                <DialogDescription>
                  Please review the question before submitting.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 p-4">
                <div className="space-y-4">
                  <h3 className=" font-semibold border-b border-gray-300 pb-2 text-primary">
                    Question:
                  </h3>
                  <p className="text-sm">{watch("question.name")}</p>
                  {imagePreviews.question && (
                    <img
                      src={imagePreviews.question}
                      alt="Question"
                      className=" max-w-full max-h-40 h-auto object-cover rounded-md shadow-md"
                    />
                  )}
                </div>
                <div className="space-y-4">
                  <h3 className=" font-semibold border-b border-gray-300 pb-2 text-primary">
                    Description:
                  </h3>
                  <p className="text-sm max-h-40 overflow-y-auto whitespace-pre-wrap">
                    {watch("description")}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {["A", "B", "C", "D"].map((option) => (
                    <div
                      key={option}
                      className="space-y-3 bg-gray-50 p-4 rounded-lg"
                    >
                      <h4 className="text-md font-semibold border-b border-gray-300 pb-2 text-primary">
                        Option {option}:
                      </h4>
                      <p className="text-sm">{watch(`opt_${option}.name`)}</p>
                      {imagePreviews[`opt_${option}`] && (
                        <img
                          src={imagePreviews[`opt_${option}`]}
                          alt={`Option ${option}`}
                          className="max-w-full h-auto max-h-40 object-cover rounded-md shadow-sm"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className=" p-4 rounded-lg flex gap-1">
                  <h4 className="text-md font-semibold  text-primary">
                    Correct Option:
                  </h4>
                  <p className="text-md ">{watch("opt_correct")}</p>
                </div>
                <div className=" p-4 rounded-lg flex gap-1">
                  <h4 className="text-md font-semibold  text-primary">
                    Exam Category:
                  </h4>
                  <p className="text-md ">{examIdToName(watch("exam_id"))}</p>
                </div>
              </div>
              <DialogFooter className="mt-4 justify-end flex flex-row gap-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    type="submit"
                    form="question-form"
                    className="bg-primary text-white flex items-center gap-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && <Spinner />}
                    Submit
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </form>
      </CardContent>
    </Card>
  );
}
