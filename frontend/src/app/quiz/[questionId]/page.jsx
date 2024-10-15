import axios from "axios";
import AnswerList from "./components/AnswerList";

const Question = async ({ params }) => {
  const questionId = params.questionId;
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/question/${questionId}`
  );
  const question = response.data;

  return (
    <>
      <AnswerList question={question} />
    </>
  );
};

export default Question;
