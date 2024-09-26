"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Question from "../../components/Question";
import axios from "axios";
import { exams } from "@/examData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const levels = Array.from({ length: 50 }, (_, i) => i + 1);

const QuestionList = ({ params }) => {
  const router = useRouter();
  const { exam_id } = params;

  const [questions, setQuestions] = useState([]);
  const [examId, setExamId] = useState(exam_id);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (examId && currentLevel) {
      fetchQuestions(examId, currentLevel);
    }
  }, [examId, currentLevel]);

  const fetchQuestions = async (examId, level) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/question/exam/${examId}?level=${level}`
      );
      const data = response.data;
      console.log("Questions:", data);
      setQuestions(data || []);
    } catch (error) {
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
        <h1 className="text-3xl font-bold">Questions</h1>

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
                  <SelectItem key={exam.exam_id} value={exam.exam_id}>
                    {exam.name}
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
                {levels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
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
          Level {currentLevel} of {levels.length}
        </span>
        <Button
          variant="link"
          onClick={() => {
            const nextLevel = Math.min(currentLevel + 1, levels.length);
            router.push(`/admin/question/exam/${examId}?level=${nextLevel}`);
            setCurrentLevel(nextLevel);
          }}
          disabled={currentLevel === levels.length}
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
            Level {currentLevel} of {levels.length}
          </span>
          <Button
            variant="link"
            onClick={() => {
              const nextLevel = Math.min(currentLevel + 1, levels.length);
              router.push(`/admin/question/exam/${examId}?level=${nextLevel}`);
              setCurrentLevel(nextLevel);
            }}
            disabled={currentLevel === levels.length}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuestionList;
