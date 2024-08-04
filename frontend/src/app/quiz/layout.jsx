import { authChecker } from "@/authChecker";
import { redirect } from "next/navigation";

const QuizLayout = ({ children }) => {
  if (!authChecker()) {
    console.log("redirecting from layout");
    redirect("/login");
  }

  return <div>{children}</div>;
};

export default QuizLayout;
