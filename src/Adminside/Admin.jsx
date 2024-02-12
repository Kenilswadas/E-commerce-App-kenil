import React from "react";
import { VerticalNavbar } from "../Smallcomponents/VerticalNavbar";
const Admin = ({userName}) => {
  return (
    <div className="flex">
      <div>
        <VerticalNavbar  userName = {userName}/>
      </div>
      <div className="bg-gray-200 flex items-center justify-center w-full">
        <h1 className="text-4xl text-[#747264]">
          Wellcome {userName}
        </h1>
      </div>
    </div>
  );
};

export default Admin;
