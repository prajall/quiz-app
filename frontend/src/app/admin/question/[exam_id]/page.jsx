"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Question from "../components/Question";
import axios from "axios";
import { exams } from "@/examData";

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
      setQuestions(data || []);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExamChange = (e) => {
    const selectedExamId = e.target.value;
    setExamId(selectedExamId);
    setCurrentLevel(1);
    router.push(`/admin/question/${selectedExamId}?level=1`);
  };

  const handleLevelChange = (e) => {
    const selectedLevel = e.target.value;
    setCurrentLevel(selectedLevel);
    router.push(`/admin/question/${examId}?level=${selectedLevel}`);
  };

  return (
    <div className="mx-auto py-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Questions</h1>
        <div className="flex space-x-4">
          <div>
            <label htmlFor="exam-select" className="block mb-2 font-semibold">
              Select Exam:
            </label>
            <select
              id="exam-select"
              value={examId}
              onChange={handleExamChange}
              className="border rounded px-2 py-1 text-sm"
            >
              {exams.map((exam) => (
                <option key={exam.exam_id} value={exam.exam_id}>
                  {exam.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="level-select" className="block mb-2 font-semibold">
              Select Level:
            </label>
            <select
              id="level-select"
              value={currentLevel}
              onChange={handleLevelChange}
              className="border rounded px-2 py-1 text-sm"
            >
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-2 items-center justify-center mt-4 mb-2">
        <Button
          variant="outline"
          onClick={() => {
            const prevLevel = Math.max(currentLevel - 1, 1);
            router.push(`/admin/question/${examId}?level=${prevLevel}`);
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
          variant="outline"
          onClick={() => {
            const nextLevel = Math.min(currentLevel + 1, levels.length);
            router.push(`/admin/question/${examId}?level=${nextLevel}`);
            setCurrentLevel(nextLevel);
          }}
          disabled={currentLevel === levels.length}
        >
          Next
        </Button>
      </div>

      {/* Conditional rendering based on the loading state */}
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
    </div>
  );
};

export default QuestionList;
