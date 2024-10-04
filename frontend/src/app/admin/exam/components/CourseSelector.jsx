"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";

export default function CourseSelector({ onChangeCourses, selectedCourses }) {
  console.log("Selected: ", selectedCourses);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [localSelectedCourses, setLocalSelectedCourses] =
    useState(selectedCourses);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://etutorclass.com/api/v1/categories"
      );
      console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategoryDetails = async (slug) => {
    try {
      const response = await axios.get(
        `https://etutorclass.com/api/v1/category/${slug}`
      );
      console.log(response.data);
      setCategoryDetails(response.data.category);
    } catch (error) {
      console.error("Error fetching category details:", error);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchCategoryDetails(selectedCategory);
    }
  }, [selectedCategory]);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleCourseToggle = (course) => {
    setLocalSelectedCourses((prev) => {
      const exists = prev.some((c) => c.id === course.id);
      if (exists) {
        return prev.filter((c) => c.id !== course.id);
      } else {
        return [...prev, { id: course.id, name: course.name }];
      }
    });
  };

  const removeCourse = (id) => {
    setLocalSelectedCourses((prev) =>
      prev.filter((course) => course.id !== id)
    );
  };

  useEffect(() => {
    console.log(localSelectedCourses);
    onChangeCourses(localSelectedCourses);
  }, [localSelectedCourses]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-x-2">
        {localSelectedCourses.map((course) => (
          <div
            key={course.id}
            className="flex items-center border w-fit overflow-hidden mt-2 text-ellipsis whitespace-nowrap border-primary bg-blue-50 px-2 pl-3 py-1 rounded-full text-sm"
          >
            <p className="">{course.name.slice(0, 25)}</p>
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 h-4 w-4 flex items-center justify-center hover:bg-primary hover:text-white rounded-full"
              onClick={() => removeCourse(course.id)}
            >
              <X size={12} />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <div className="w-full sm:w-1/2">
          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full sm:w-1/2">
          <ScrollArea className="h-[150px] w-full border rounded-md p-2">
            {categoryDetails ? (
              categoryDetails.courses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center space-x-2 p-2"
                >
                  <Checkbox
                    id={`course-${course.id}`}
                    checked={localSelectedCourses.some(
                      (c) => c.id === course.id
                    )}
                    onCheckedChange={() => handleCourseToggle(course)}
                    className="text-white"
                  />
                  <label
                    htmlFor={`course-${course.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {course.name}
                  </label>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                Select a category to view courses
              </p>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
