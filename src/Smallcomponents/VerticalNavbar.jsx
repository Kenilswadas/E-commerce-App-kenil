import { getAuth } from "@firebase/auth";
import { Link, NavLink } from "react-router-dom";

const VerticalNavbar = () => {
  const user = getAuth();
  return (
    <div className="h-screen flex flex-col bg-[#D9D9D9] w-64">
      <div className="h-16 flex items-center justify-center text-[#747264] text-xl font-bold">
        {localStorage.getItem("userName")}
      </div>
      <nav className="flex-1 bg-gray-600 p-4">
        <ul>
          <li>
            <NavLink
              className={({ isActive }) =>
                `block text-white py-2 px-4  ${
                  isActive ? "bg-[#D9D9D9]" : null
                } hover:bg-[#D9D9D9] hover:text-[#747264] `
              }
              to={"/Admin/Dashboard"}
            >
              Dashboard
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              className={({ isActive }) =>
                `block text-white py-2 px-4  ${
                  isActive ? "bg-[#D9D9D9]" : null
                } hover:bg-[#D9D9D9] hover:text-[#747264] `
              }
              to={""}
            >
              users
            </NavLink>
          </li> */}
          <li>
            <NavLink
              className={({ isActive }) =>
                `block text-white py-2 px-4  ${
                  isActive ? "bg-[#D9D9D9]" : null
                } hover:bg-[#D9D9D9] hover:text-[#747264] `
              }
              to={"/Admin/Products"}
            >
              Products
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              className={({ isActive }) =>
                `block text-white py-2 px-4  ${
                  isActive ? "bg-[#D9D9D9]" : null
                } hover:bg-[#D9D9D9] hover:text-[#747264] `
              }
              to={"#"}
            >
              Settings
            </NavLink>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export { VerticalNavbar };
