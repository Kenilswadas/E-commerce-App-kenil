import React from "react";
import { useNavigate } from "react-router";
const NavButton = ({ buttonName, FaIons, page }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className=" flex items-center bg-[#217aa9] text-[#ebf1f1] rounded-full p-1 m-1 pl-6 pr-6 hover:bg-[#96002e] hover:text-[#ffffff]"
      onClick={() => navigate(`${page}`)}
    >
      {FaIons}
      {buttonName}
    </button>
  );
};
export { NavButton };
