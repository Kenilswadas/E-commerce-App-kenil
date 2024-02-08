import { Link } from "react-router-dom";
const VerticalNavbar = () => {
  return (
    <div className="h-screen flex flex-col bg-[#747264] w-64">
      <div className="h-16 flex items-center justify-center text-white text-xl font-bold">
        Admin Panel
      </div>
      <nav className="flex-1 bg-gray-600 p-4">
        <ul>
          <li>
            <Link className="block text-white py-2 px-4 hover:bg-[#D9D9D9] hover:text-[#747264]">
              Deshbord
            </Link>
          </li>
          <li>
            <Link className="block text-white py-2 px-4 hover:bg-[#D9D9D9] hover:text-[#747264]">
              users
            </Link>
          </li>
          <li>
            <Link
              className="block text-white py-2 px-4 hover:bg-[#D9D9D9] hover:text-[#747264]"
              to={"/Admin/Products"}
            >
              Products
            </Link>
          </li>
          <li>
            <Link className="block text-white py-2 px-4 hover:bg-[#D9D9D9] hover:text-[#747264]">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export { VerticalNavbar };
