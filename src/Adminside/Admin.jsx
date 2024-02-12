import React from "react";
import { VerticalNavbar } from "../Smallcomponents/VerticalNavbar";
const Admin = () => {
  return (
    <div className="flex">
      <div>
        <VerticalNavbar />
      </div>
      <div className="bg-gray-200 flex items-center justify-center w-full">
        <h1 className="text-4xl text-[#747264]">
          Wellcome {localStorage.getItem("userName")}
        </h1>
      </div>
    </div>
  );
};

export default Admin;
