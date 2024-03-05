import React from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
function UserProfileNavbar() {
  return (
    <nav className="w-1/5 h-full flex flex-col text-center bg-[#ebf1f1]  mr-2">
      <div className="border-b-2  border-gray-300">
        <ul className="w-full">
          <li className="flex flex-col  w-full p-2">
            <NavLink
              className={({ isActive }) =>
                `p-2 mt-4 w-full bg-[#ebf1f1] text-[#96200e] hover:bg-[#ffffff] hover:text-[#96200e] ${
                  !isActive ? `bg-[#ffffff] text-[#96200e]` : null
                } `
              }
            >
              OverView
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `p-2 mt-4 w-full bg-[#ebf1f1] text-[#96200e] hover:bg-[#ffffff] hover:text-[#96200e] ${
                  !isActive ? `bg-[#ffffff] text-[#96200e]` : null
                } `
              }
            >
              My Orders
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="border-b-2  border-gray-300">
        <ul className="w-full">
          <li className="flex flex-col w-full p-2">
            <NavLink
              to={"/UsersProfilePage/Profiledetail"}
              className={({ isActive }) =>
                `p-2 mt-4 w-full bg-[#ebf1f1] text-[#96200e] hover:bg-[#ffffff] hover:text-[#96200e] ${
                  isActive ? `bg-[#ffffff] text-[#96200e]` : null
                } `
              }
            >
              Profile detail
            </NavLink>
            <NavLink
              to={"/UsersProfilePage/UserAddress"}
              className={({ isActive }) =>
                `p-2 mt-4 w-full bg-[#ebf1f1] text-[#96200e] hover:bg-[#ffffff] hover:text-[#96200e] ${
                  isActive ? `bg-[#ffffff] text-[#96200e]` : null
                } `
              }
            >
              Saved Addresses
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex items-end h-full">
        <ul className="w-full">
          <li className="flex flex-col w-full p-2">
            <NavLink className=" flex items-center justify-center p-2 mt-4 w-full bg-[#96200e] text-[#ffffff] hover:bg-[#ffffff] hover:text-[#96200e]">
              {"Log Out"} <HiOutlineLogout />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default UserProfileNavbar;