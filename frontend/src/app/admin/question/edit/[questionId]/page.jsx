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
import imageCompression from "browser-image-compression";

export default function QuestionEditForm({ params }) {
  const { questionId } = params;
  const [prevData, setPrevData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [imagePreviews, setImagePreviews] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [exams, setExams] = useState([]);
  const [images, setImages] = useState({
    question: null,
    opt_A: null,
    opt_B: null,
    opt_C: null,
    opt_D: null,
  });
  const [savedImageUrls, setSavedImageUrls] = useState({
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
  } = useForm({});

  const fetchQuestion = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/question/${questionId}`
      );
      if (response.status === 200) {
        setPrevData(response.data);
        reset(response.data);
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(async () => {
    fetchQuestion();

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/exam`
      );
      if (response.status == 200) {
        setExams(response.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch Exams");
    }
  }, []);

  const onSubmit = async (data) => {
    console.log("Data: ", data);
    try {
      let uploadQuestion = true;
      setIsSubmitting(true);
      const formData = new FormData();
      const validImageTypes = ["image/jpeg", "image/jpg", "image/png"];

      const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
      const cloudinaryPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;

      const uploadImageToCloudinary = async (image) => {
        const compressionOptions = {
          maxSizeMB: 0.1,
          useWebWorker: true,
        };

        try {
          console.log("Before Compression", image.size);
          const compressedImage = await imageCompression(
            image,
            compressionOptions
          );
          console.log("After Compression", compressedImage.size);

          const imageFormData = new FormData();
          imageFormData.append("file", compressedImage);
          imageFormData.append("upload_preset", cloudinaryPreset);
          imageFormData.append("api_key", "993734845948435");

          const response = await axios.post(cloudinaryUrl, imageFormData);
          if (response.status === 200) {
            return response.data.secure_url;
          } else {
            console.error("Failed to upload image to Cloudinary:", response);
            uploadQuestion = false;
            return null;
          }
        } catch (error) {
          toast.error("Error uploading image");
          console.error("Error uploading image:", error);
          uploadQuestion = false;
          return null;
        }
      };

      const imageUrls = {};

      const uploadImages = async () => {
        for (const [key, image] of Object.entries(images)) {
          if (image) {
            if (!validImageTypes.includes(image.type)) {
              setError(`${key}.image`, {
                type: "manual",
                message: `Invalid image type for ${key}. Only JPEG, JPG, and PNG are allowed.`,
              });
              console.log(`Invalid image type for ${key}`);
              throw new Error("Invalid image type");
            } else if (savedImageUrls[key]) {
              console.log("Using saved image: ", savedImageUrls[key]);
              imageUrls[key] = savedImageUrls[key];
            } else {
              const secureUrl = await uploadImageToCloudinary(image);
              if (secureUrl) {
                imageUrls[key] = secureUrl;
                setSavedImageUrls((prev) => ({ ...prev, [key]: secureUrl }));
              } else {
                uploadQuestion = false;
                throw new Error("Failed to upload image");
              }
            }
          }
        }
      };

      if (!uploadQuestion) {
        toast.error("Question uploading terminated");
        return;
      }

      await toast.promise(uploadImages(), {
        pending: "Uploading images. This may take a while...",
        error: "Failed to upload images",
      });

      let dataPayload = {
        question: {
          image: imageUrls.question || prevData.question.image || "",
          name: data.question.name || "",
        },
        description: data.description || "",
        opt_correct: data.opt_correct || "",
        examId: data.examId || "",
      };

      const options = ["A", "B", "C", "D"];
      options.forEach((option) => {
        console.log("filling Datapayload: ", `opt_${option}`);
        dataPayload[`opt_${option}`] = {
          name: data[`opt_${option}`].name || "",
          image:
            imageUrls[`opt_${option}`] ||
            prevData?.[`opt_${option}`]?.image ||
            "",
        };
      });

      console.log("Data Payload: ", dataPayload);

      if (!uploadQuestion) {
        toast.error("Question uploading terminated");
        return;
      }

      // Log the formData
      console.log("FormData: ");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      const response = await toast.promise(
        axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/question/edit/${questionId}`,
          dataPayload,
          {
            headers: {
              // "Content-Type": "multipart/form-data",
              apiKey: 123456789,
            },
            withCredentials: true,
          }
        ),
        {
          pending: "Submitting your question...",
          success: "Question updated successfully",
          error: {
            render({ data }) {
              if (data.message === "Network Error") {
                return "Failed to connect to the server";
              } else if (data.response?.data) {
                return data.response.data.message;
              } else if (data.response.statusCode >= 500) {
                return "Internal Server Error";
              } else {
                return "Something went wrong";
              }
            },
          },
        }
      );

      if (response.status === 200) {
        console.log("Update Response: ", response.data);
        reset();
        // window.location.reload()
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const createImageUrl = (image, key) => {
    if (image) {
      URL.revokeObjectURL(imagePreviews);
    }
    const newImageUrl = URL.createObjectURL(image);
    setImagePreviews((prev) => ({ ...prev, [key]: newImageUrl }));
    console.log("setImagePreviews: ", imagePreviews);
  };

  const ImagePreview = ({ src, onRemove, isNew }) => (
    <div className="mt-2 relative w-fit">
      {isNew && (
        <div className="absolute top-0 left-0 bg-blue-500/90 text-white text-xs font-bold px-2 py-1 rounded-br rounded-tl">
          New
        </div>
      )}
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
    if (images[key]) {
      setImages((prev) => {
        const newPreviews = { ...prev };
        delete newPreviews[key];
        return newPreviews;
      });
    }
    if (imagePreviews[key]) {
      setImagePreviews((prev) => {
        const newPreviews = { ...prev };
        delete newPreviews[key];
        return newPreviews;
      });
    }

    setImages((prev) => ({ ...prev, [key]: null }));

    setValue(`${key}.image`, null);

    setPrevData((prev) => {
      const newPrevData = { ...prev };
      if (newPrevData[key] && newPrevData[key].image) {
        delete newPrevData[key].image;
      }
      return newPrevData;
    });
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <Card className="w-full px-0 mx-auto bg-white text-black border-none">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-bold text-primary">
          Edit Question
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <form
          id="question-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="">
            <Label className="font-semibold text-md" htmlFor="question.name">
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
              <p className="text-red-500 text-xs">
                {errors.question.name.message}
              </p>
            )}

            <Input
              id="question.image"
              type="file"
              accept="image/*"
              {...register("question.image")}
              className="bg-white text-black hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                createImageUrl(file, "question");
                setImages((prev) => ({ ...prev, question: file }));
              }}
            />
            {!imagePreviews.question && !prevData?.question?.image && (
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
                isNew={true}
              />
            )}
            {prevData?.question?.image && (
              <ImagePreview
                src={prevData?.question?.image}
                onRemove={() => removeImage("question")}
              />
            )}
            {errors.question?.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.question.image.message}
              </p>
            )}
          </div>

          <div>
            <Label className="font-semibold text-md  " htmlFor="description">
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
                  className="font-semibold text-md "
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
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setImages((prev) => ({ ...prev, [`opt_${option}`]: file }));
                  }}
                />
                {!imagePreviews[`opt_${option}`] &&
                  !prevData?.[`opt_${option}`]?.image && (
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
                    isNew={true}
                  />
                )}
                {prevData?.[`opt_${option}`]?.image && (
                  <ImagePreview
                    src={prevData?.[`opt_${option}`]?.image}
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
                htmlFor="examId"
              >
                Exam Category:
              </Label>
              <Controller
                name="examId"
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
                          <SelectItem key={exam._id} value={exam._id}>
                            {exam.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  );
                }}
              />

              {errors.examId && (
                <p className="text-red-500">{errors.examId.message}</p>
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
                  {images.question && (
                    <div className="w-fit relative">
                      <div className="absolute top-0 left-0 bg-blue-500/90 text-white text-xs font-bold px-2 py-1 rounded-br rounded-tl">
                        New
                      </div>
                      <img
                        src={URL.createObjectURL(images.question)}
                        alt="Question"
                        className=" max-w-full max-h-40 h-auto object-cover rounded-md shadow-md"
                      />
                    </div>
                  )}
                  {prevData?.question?.image && (
                    <img
                      src={prevData?.question?.image}
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
                      {images[`opt_${option}`] && (
                        <div className="w-fit relative">
                          <div className="absolute top-0 left-0 bg-blue-500/90 text-white text-xs font-bold px-2 py-1 rounded-br rounded-tl">
                            New
                          </div>
                          <img
                            src={URL.createObjectURL(images[`opt_${option}`])}
                            alt={`Option ${option}`}
                            className="max-w-full h-auto max-h-40 object-cover rounded-md shadow-sm"
                          />
                        </div>
                      )}
                      {prevData?.[`opt_${option}`]?.image && (
                        <img
                          src={prevData?.[`opt_${option}`]?.image}
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
                  <p className="text-md ">
                    {exams.find((exam) => exam._id === watch("examId"))}
                  </p>
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
