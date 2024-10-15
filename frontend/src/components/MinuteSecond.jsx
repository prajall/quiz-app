import { calculateTime } from "@/clientSideFunctions";
import React from "react";

const MinuteSecond = ({ time }) => {
  return (
    <div className="w-fit">
      {calculateTime(time).minute > 0 && (
        <span>{calculateTime(time).minute}:</span>
      )}
      <span>
        {calculateTime(time).seconds < 10
          ? `0${calculateTime(time).seconds}`
          : calculateTime(time).seconds}
      </span>
    </div>
  );
};

export default MinuteSecond;
