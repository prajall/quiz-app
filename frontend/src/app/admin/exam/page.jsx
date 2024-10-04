"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Plus, PlusCircle } from "lucide-react";

export default function ExamCards() {
  const router = useRouter();
  const [exams, setExams] = useState([]);

  useEffect(() => {
    // Fetch exams from your API
    const fetchExams = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/exam/admin`
        );
        setExams(response.data);
      } catch (error) {
        console.error("Failed to fetch exams:", error);
      }
    };

    fetchExams();
  }, []);

  const handleExamClick = (examId) => {
    router.push(`exam/${examId}`);
  };

  const handleAddExamClick = () => {
    router.push("exam/new");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-start mb-6">
        <Link href="exam/new">
          <Button className="flex gap-2 items-center ">Add New Exam</Button>
        </Link>
      </div>

      {/* Exam Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
        {exams.map((exam) => (
          <Card
            key={exam._id}
            onClick={() => handleExamClick(exam._id)}
            className="cursor-pointer min-w-[300px] w-full"
          >
            <CardHeader>
              <CardTitle>{exam.title}</CardTitle>
              {exam.subTitle && (
                <CardDescription>{exam.subTitle}</CardDescription>
              )}
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>Total Questions: {exam.totalQuestions}</p>
              <p>Total Levels: {exam.totalLevels}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
