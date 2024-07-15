import AnswerList from "@/components/AnswerList";
import axios from "axios";

const Question = async ({ params }) => {
  const questionId = params.questionId;
  const response = await axios.get(
    `http://localhost:3001/question/${questionId}`
  );
  const question = response.data.question;

  return (
    <>
      <div className="m-2">
        <h2>{question.name}</h2>
        <AnswerList question={question} />
      </div>
    </>
  );
};

export default Question;
