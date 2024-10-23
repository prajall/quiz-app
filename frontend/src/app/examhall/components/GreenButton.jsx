const GreenButton = ({ text, onClick }) => {
  return (
    <button
      className="border border-green-500 hover:bg-green-50 text-green-500 w-28 text-xs py-2 rounded-md "
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default GreenButton;
