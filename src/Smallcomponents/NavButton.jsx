const NavButton = ({ buttonName, FaIons }) => {
    return (
      <button className=" flex items-center bg-white rounded-full p-1 m-1 pl-6 pr-6">
        {FaIons}
        {buttonName}
      </button>
    );
  };
  export { NavButton };