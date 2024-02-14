// Button component
const Button = ({ btnName, faicon, clickHandler }) => {
  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        onClick={() => {
          clickHandler();
        }}
        className="flex items-center justify-center bg-[#217aa9] text-[#ebf1f1] rounded-full mt-5 p-px pl-2 pr-2 w-fit hover:bg-[#96002e]"
      >
        {faicon}
        {btnName}
      </button>
    </div>
  );
};

export { Button };
