const OrangeButton = ({ text, onClick }) => {
  return (
    <button
      className={`border border-orange-400 hover:bg-orange-50 text-orange-400 w-28 text-xs py-2 rounded-md`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default OrangeButton;
