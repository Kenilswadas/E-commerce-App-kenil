// Button component
const Button = ({ btnName, faicon, clickHandler }) => {
  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        onClick={() => {
          clickHandler();
        }}
        className="flex items-center justify-center bg-[#E0CCBE] text-[#3C3633] rounded-full mt-5 p-px pl-2 pr-2 w-fit hover:bg-red-200"
      >
        {faicon}
        {btnName}
      </button>
    </div>
  );
};

export { Button};
