import { Loader2 } from "lucide-react";

const Spinner = () => {
  return (
    <div className="">
      <Loader2 size={15} className="animate-spin" />
    </div>
  );
};

export default Spinner;
