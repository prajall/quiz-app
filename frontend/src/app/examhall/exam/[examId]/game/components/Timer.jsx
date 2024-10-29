const Timer = ({ totalTime, timeLeft }) => {
  const radius = 35; // Radius of the circle
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius; // Circumference of the circle

  // Calculate the stroke-dashoffset based on the remaining time
  const strokeDashoffset =
    circumference - (timeLeft / totalTime) * circumference;

  // Calculate minutes and seconds from timeLeft
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Determine color based on remaining time percentage
  const remainingPercentage = (timeLeft / totalTime) * 100;
  let timerColor = "green";
  if (remainingPercentage <= 25) {
    timerColor = "red";
  } else if (remainingPercentage <= 50) {
    timerColor = "orange";
  }

  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      <svg className="absolute top-0 left-0" width="100" height="100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="lightgray"
          strokeWidth={strokeWidth}
          fill="white"
        />
        {/* Timer ring */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={timerColor}
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
        {minutes}:{String(seconds).padStart(2, "0")}
      </div>
    </div>
  );
};

export default Timer;
