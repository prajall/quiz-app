import Timer from "@/components/Timer";

const GameLayout = ({ children }) => {
  // const questions = axios.get("http/localhost:3001/questions?limit=20");

  return (
    <div>
      <h2>Question Category</h2>
      <Timer maxTime={90000} />
      {children}
    </div>
  );
};

export default GameLayout;
