"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Question from "../components/Question";
import axios from "axios";

const exams = [
  { exam_id: 1002, name: "Health" },
  { exam_id: 1003, name: "Math" },
  // Add more exams as needed
];

const levels = Array.from({ length: 50 }, (_, i) => i + 1);

const QuestionList = ({ params }) => {
  const router = useRouter();
  const query = router.query;

  const [questions, setQuestions] = useState([]);
  const examId = params.exam_id;
  const currentLevel = 1;

  useEffect(() => {
    fetchQuestions(currentLevel);
  }, [examId, currentLevel]);

  const fetchQuestions = async (level) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/question/exam/${examId}?level=${level}`
      );
      const data = response.data;
      setQuestions(data.questions || []);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleExamChange = (e) => {
    const selectedExamId = e.target.value;
    router.push({
      pathname: `/questions/${selectedExamId}`,
      query: { level: 1 }, // Reset level to 1 when exam changes
    });
  };

  const handleLevelChange = (e) => {
    const selectedLevel = e.target.value;
    router.push({
      pathname: `/questions/${examId}`,
      query: { level: selectedLevel },
    });
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
              className="border rounded px-2 py-1"
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
              className="border rounded px-2 py-1"
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

      {questions.map((question) => (
        <Question question={question} key={question._id} />
      ))}

      <div className="flex justify-between mt-4">
        <Button
          onClick={() => {
            const prevLevel = Math.max(currentLevel - 1, 1);
            router.push({
              pathname: `/questions/${examId}`,
              query: { level: prevLevel },
            });
          }}
          disabled={currentLevel === 1}
        >
          Previous
        </Button>
        <span>
          Level {currentLevel} of {levels.length}
        </span>
        <Button
          onClick={() => {
            const nextLevel = Math.min(currentLevel + 1, levels.length);
            router.push({
              pathname: `/questions/${examId}`,
              query: { level: nextLevel },
            });
          }}
          disabled={currentLevel === levels.length}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default QuestionList;
