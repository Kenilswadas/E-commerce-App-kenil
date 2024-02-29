import React from "react";
import NavBar from "../Smallcomponents/NavBar";
import { NavLink } from "react-router-dom";

function UsersProfilePage({ userName }) {
  return (
    <div>
      <NavBar
        btn1name={"Home"}
        btn2name={"Men"}
        btn3name={"Women"}
        btn4name={"Kids"}
        btn5name={"Beauty"}
        userName={userName}
      />
      <div className="flex flex-col mt-10  m-10 p-2 ml-40 mr-40">
        <h1 className="bg-[#ebf1f1] w-full p-4 border-b-2 border-[#96200e]">
          {"Account"}
        </h1>
        <div className="h-screen flex mt-2">
          <nav className="w-1/5 h-full flex  justify-center bg-[#ebf1f1] border-r-2 border-[#96200e]">
            <ul>
              <li className="mt-5">
                <NavLink className=" mt-4 p-2 w-fit bg-red-200">kneil</NavLink>
              </li>
            </ul>
          </nav>
          <div className="w-4/5 bg-[#ebf1f1] h-full"></div>
        </div>
      </div>
    </div>
  );
}

export default UsersProfilePage;
