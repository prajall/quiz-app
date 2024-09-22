import { Loader2 } from "lucide-react";

const Spinner = ({ size = 15 }) => {
  return (
    <div className="">
      <Loader2 size={size} className="animate-spin" />
    </div>
  );
};

export default Spinner;
