import { Loader2 } from "lucide-react";

const OrangeButton = ({ text, onClick, loading }) => {
  return (
    <button
      className={`border border-orange-400 hover:bg-orange-50 text-orange-400 w-28 text-xs py-2 rounded-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="h-3 w-3 animate-spin" />
          Loading...
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default OrangeButton;
