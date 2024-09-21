"use client";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { exams } from "@/examData";

const examIds = [
  "1001",
  "1002",
  "1003",
  "1004",
  "1005",
  "1006",
  "1007",
  "1008",
  "1009",
  "1010",
];

export default function QuestionForm() {
  const [imagePreviews, setImagePreviews] = useState({});

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();

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
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreviews((prev) => {
          const newPreviews = { ...prev };
          delete newPreviews[key];
          return newPreviews;
        });
      }
    };

    updateImagePreview("question", questionImage);
    updateImagePreview("opt_A", optAImage);
    updateImagePreview("opt_B", optBImage);
    updateImagePreview("opt_C", optCImage);
    updateImagePreview("opt_D", optDImage);
  }, [questionImage, optAImage, optBImage, optCImage, optDImage]);

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (
            subKey === "image" &&
            subValue instanceof FileList &&
            subValue.length > 0
          ) {
            formData.append(`${key}.${subKey}`, subValue[0]);
          } else {
            formData.append(`${key}.${subKey}`, String(subValue));
          }
        });
      } else {
        formData.append(key, String(value));
      }
    });
    console.log("Form Data:", Object.fromEntries(formData));
    // Here you would typically send the formData to your backend
  };

  const ImagePreview = ({ src }) => (
    <div className="mt-2">
      <img
        src={src}
        alt="Preview"
        className="max-w-full h-auto max-h-40 rounded-md"
      />
    </div>
  );

  return (
    <Card className="w-full mx-auto bg-white text-black">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">
          Add New Question
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="font-semibold text-md" htmlFor="id">
                ID
              </Label>
              <Input
                id="id"
                {...register("id", { required: "ID is required" })}
                className="bg-white text-black mt-1"
              />
              {errors.id && <p className="text-red-500">{errors.id.message}</p>}
            </div>

            <div>
              <Label className="font-semibold text-md" htmlFor="exam_id">
                Exam Category
              </Label>
              <Controller
                name="exam_id"
                control={control}
                rules={{ required: "Exam ID is required" }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="bg-white text-black mt-1">
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
                )}
              />
              {errors.exam_id && (
                <p className="text-red-500">{errors.exam_id.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label className="font-semibold text-md" htmlFor="description">
              Description
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              className="bg-white text-black mt-1"
            />
          </div>

          <div className="">
            <Label className="font-semibold text-md" htmlFor="question.name">
              Question
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
                className="bg-white text-black mt-1"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("question.image").click();
                }}
              >
                Add Image
              </Button>
            )}
            {imagePreviews.question && (
              <ImagePreview src={imagePreviews.question} />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["A", "B", "C", "D"].map((option) => (
              <div key={option} className="space-y-2">
                <Label
                  className="font-semibold text-md"
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

                {/* <Label
                  className="font-semibold"
                  text-md
                  mb-1
                  htmlFor={`opt_${option}.image`}
                >
                  Option {option} Image (Optional)
                </Label> */}
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
                    className="bg-white text-black"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(`opt_${option}.image`).click();
                    }}
                  >
                    Add Image
                  </Button>
                )}

                {imagePreviews[`opt_${option}`] && (
                  <ImagePreview src={imagePreviews[`opt_${option}`]} />
                )}
              </div>
            ))}
          </div>

          <div>
            <Label className="font-semibold text-md" htmlFor="opt_correct">
              Correct Option
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
                  <SelectTrigger className="bg-white text-black">
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

          <Button type="submit" className="w-full bg-primary text-white">
            Submit Question
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
