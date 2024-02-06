const NavButton = ({ buttonName, FaIons }) => {
  return (
    <button className=" flex items-center bg-white text-[#747264] rounded-full p-1 m-1 pl-6 pr-6 hover:bg-[#747264] hover:text-[#ffffff]">
      {FaIons}
      {buttonName}
    </button>
  );
};
export { NavButton };
