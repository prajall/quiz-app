"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Question from "../../components/Question";
import axios from "axios";
import { AppContext } from "@/contexts/AppContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { set } from "react-hook-form";
import Link from "next/link";
import { Plus } from "lucide-react";

const QuestionList = ({ params }) => {
  const [examId, setExamId] = useState(params.examId);

  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [maxLevel, setMaxLevel] = useState(0);
  const [loading, setLoading] = useState(false);
  const { appData } = useContext(AppContext);

  const exams = appData.exams ? appData.exams : [];

  useEffect(() => {
    if (!appData.isLoading && examId && currentLevel) {
      const maxLevelVar = Number(
        exams.find((exam) => exam._id === examId)?.totalLevels || 0
      );
      setMaxLevel(maxLevelVar);
      fetchQuestions(examId, currentLevel);
    }
  }, [examId, currentLevel]);

  const fetchQuestions = async (examId, level) => {
    setLoading(true);
    console.log("Fetching question:", examId, level);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/question/exam/${examId}/admin?level=${level}`,
        // {},
        {
          headers: {
            etutor_id: "96712",
          },
        }
      );
      const data = response.data;
      console.log("Questions:", data);
      setQuestions(data || []);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Unauthorized");
      }
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExamChange = (selectedExamId) => {
    setExamId(selectedExamId);
    setCurrentLevel(1);
    router.push(`/admin/question/exam/${selectedExamId}?level=1`);
  };

  const handleLevelChange = (selectedLevel) => {
    setCurrentLevel(selectedLevel);
    router.push(`/admin/question/exam/${examId}?level=${selectedLevel}`);
  };

  return (
    <div className="mx-auto py-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex gap-4 items-center">
          <h1 className="text-3xl font-bold">Questions</h1>
          <Link href="/admin/question/add">
            <Button
              variant="outline"
              title="Add New Question"
              className=" h-10 w-10 p-0 "
            >
              <Plus size={14} />
            </Button>
          </Link>
        </div>

        <div className="w-full md:w-64 flex items-center gap-4 justify-between md:justify-end ">
          <div className="w-full">
            <label
              htmlFor="exam-select"
              className="block text-sm font-medium mb-1"
            >
              Select Exam:
            </label>
            <Select onValueChange={handleExamChange} value={examId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose exam" />
              </SelectTrigger>
              <SelectContent>
                {exams.map((exam) => (
                  <SelectItem key={exam._id} value={exam._id}>
                    {exam.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Level Select */}
          <div className=" items-center ">
            <label
              htmlFor="level-select"
              className="block text-sm font-medium mb-1"
            >
              Select Level:
            </label>
            <Select onValueChange={handleLevelChange} value={currentLevel}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Choose level" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: maxLevel }, (_, i) => i + 1).map(
                  (level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex gap-2 items-center justify-center mt-4 mb-2">
        <Button
          variant="link"
          onClick={() => {
            const prevLevel = Math.max(currentLevel - 1, 1);
            router.push(`/admin/question/exam/${examId}?level=${prevLevel}`);
            setCurrentLevel(prevLevel);
          }}
          disabled={currentLevel === 1}
        >
          Previous
        </Button>
        <span>
          Level {currentLevel} of {maxLevel}
        </span>
        <Button
          variant="link"
          onClick={() => {
            const nextLevel = Math.min(currentLevel + 1, maxLevel);
            router.push(`/admin/question/exam/${examId}?level=${nextLevel}`);
            setCurrentLevel(nextLevel);
          }}
          disabled={currentLevel === maxLevel}
        >
          Next
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[90vh]">
          <p>Loading...</p>
        </div>
      ) : questions.length > 0 ? (
        questions.map((question) => (
          <Question question={question} key={question._id} />
        ))
      ) : (
        <p>No questions available for this level.</p>
      )}

      {questions.length > 10 && (
        <div className="flex gap-2 items-center justify-center mt-4 mb-2">
          <Button
            variant="link"
            onClick={() => {
              const prevLevel = Math.max(currentLevel - 1, 1);
              router.push(`/admin/question/exam/${examId}?level=${prevLevel}`);
              setCurrentLevel(prevLevel);
            }}
            disabled={currentLevel === 1}
          >
            Previous
          </Button>
          <span>
            Level {currentLevel} of {maxLevel}
          </span>
          <Button
            variant="link"
            onClick={() => {
              const nextLevel = Math.min(currentLevel + 1, maxLevel);
              router.push(`/admin/question/exam/${examId}?level=${nextLevel}`);
              setCurrentLevel(nextLevel);
            }}
            disabled={currentLevel === maxLevel}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuestionList;
