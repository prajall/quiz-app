import { authChecker } from "@/authChecker";
import Timer from "@/components/Timer";

const QuizLayout = ({ children }) => {
  // const questions = axios.get("http/localhost:3001/questions?limit=20");
  authChecker();

  return (
    <div>
      <Timer />
      {children}
    </div>
  );
};

export default QuizLayout;
