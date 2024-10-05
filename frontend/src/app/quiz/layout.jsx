import { authChecker } from "@/authChecker";
import { redirect } from "next/navigation";

const QuizLayout = ({ children }) => {
  if (!authChecker()) {
    redirect("/login");
  }

  return <div>{children}</div>;
};

export default QuizLayout;
