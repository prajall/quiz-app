import axios from "axios";
import AnswerList from "./components/AnswerList";

const Question = async ({ params }) => {
  const questionId = params.questionId;
  const response = await axios.get(
    `http://localhost:3001/question/${questionId}`
  );
  const question = response.data.question;

  return (
    <>
      <AnswerList question={question} />
    </>
  );
};

export default Question;
