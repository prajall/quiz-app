import { authChecker } from "@/authChecker";
import Timer from "@/app/quiz/[questionId]/components/Timer";

const QuizLayout = ({ children }) => {
  // const questions = axios.get("http/localhost:3001/questions?limit=20");
  authChecker();

  return <div>{children}</div>;
};

export default QuizLayout;
