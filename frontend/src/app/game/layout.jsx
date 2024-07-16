import { authChecker } from "@/authChecker";
import Timer from "@/components/Timer";

const GameLayout = ({ children }) => {
  // const questions = axios.get("http/localhost:3001/questions?limit=20");
  authChecker();

  return (
    <div>
      <Timer />
      {children}
    </div>
  );
};

export default GameLayout;
