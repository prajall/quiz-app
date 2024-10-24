const Timer = ({ totalTime, timeLeft }) => {
  const radius = 35;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (timeLeft / totalTime) * circumference;

  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      <svg className="absolute top-0 left-0" width="100" height="100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="lightgray"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="green"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 200ms linear" }}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg ml-[3px] mt-[3px] font-bold">
        {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
      </div>
    </div>
  );
};
export default Timer;
