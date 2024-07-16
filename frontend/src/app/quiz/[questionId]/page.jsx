import Score from "@/components/Score";
import axios from "axios";
import ExamCategory from "./components/ExamCategory";
import AnswerList from "./components/AnswerList";

const Question = async ({ params }) => {
  const questionId = params.questionId;
  const response = await axios.get(
    `http://localhost:3001/question/${questionId}`
  );
  const question = response.data.question;

  return (
    <>
      <div className="m-2">
        <Score />
        <ExamCategory question={question} />
        <h2>{question.name}</h2>
        <AnswerList question={question} />
      </div>
    </>
  );
};

export default Question;
