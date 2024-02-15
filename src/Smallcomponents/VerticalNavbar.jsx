import { NavLink } from "react-router-dom";

const VerticalNavbar = ({ userName }) => {
  return (
    <div className="fixed h-screen w-1/6 shadow-2xl bg-[#ebf1f1] ">
      <div className="h-16 flex items-center justify-center bg-[#96002e] text-[#ebf1f1] text-xl font-bold">
        {userName}
      </div>
      <nav className="flex-1 bg-[#ebf1f1] p-4">
        <ul>
          <li>
            <NavLink
              className={({ isActive }) =>
                `block text-[#96002e] py-2 px-4  ${
                  isActive ? "bg-[#D9D9D9]" : null
                } hover:bg-[#217aa9] hover:text-[#ebf1f1] `
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
                `block text-[#96002e] py-2 px-4  ${
                  isActive ? "bg-[#D9D9D9]" : null
                } hover:bg-[#217aa9] hover:text-[#ebf1f1] `
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
