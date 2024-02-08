import React from "react";
import { VerticalNavbar } from "../Smallcomponents/VerticalNavbar";
const Admin = () => {
  return (
    <div className="flex bg-[#D9D9D9]">
      <div>
        <VerticalNavbar />
      </div>
      <div className="flex items-center justify-center h-screen w-full">
        <h1 className="text-green-500 text-5xl ">Welcome to Admin page</h1>
      </div>
    </div>
  );
};

export default Admin;
