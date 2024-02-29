import React from "react";
import { NavButton } from "./NavButton";
import logo from "../images/logo2.png";
import { Search } from "./Searchbar";
import { auth } from "../FirebaseConfig/Firebaseconfig";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "react-use-cart";
function NavBar({
  userName,
  btn1name,
  btn2name,
  btn3name,
  btn4name,
  btn5name,
}) {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  //LogOut function
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        navigate("/");
        toast("Sign-out successful.");
      })
      .catch((error) => {
        toast.error("opps ! error occurs ...");
      });
  };
  return (
    <div>
      <nav className="bg-[#ebf1f1] p-px sticky top-0 shadow-2xl z-50">
        <ul className="flex items-center justify-around">
          <li className="flex">
            <img src={logo} alt="" className="w-auto h-20 p-2" />
          </li>
          <li className="flex items-center w-2/4 ml-8">
            <NavButton buttonName={btn1name} page={"/"} />
            <NavButton buttonName={btn2name} />
            <NavButton buttonName={btn3name} page={"/Home/Fashion"} />
            <NavButton buttonName={btn4name} />
            <NavButton buttonName={btn5name} />
          </li>
          <Search />
          {auth.currentUser ? (
            <NavButton
              page={"/Home/UsersProfilePage"}
              buttonName={
                userName ? userName : localStorage.getItem("userName")
              }
              FaIons={<FaUserCircle className="mr-1" />}
            />
          ) : (
            <Link
              className="text-[#96200e] flex items-center"
              to={"/SignInPage"}
            >
              <FaUserCircle className="mr-1" />
              Login
            </Link>
          )}
          {auth.currentUser ? (
            <NavButton
              buttonName={"LogOut"}
              clickHandler={handleLogout}
              FaIons={<HiOutlineLogout />}
            />
          ) : null}
          <NavButton
            page={"/Home/Fashion/Men/Cartpage"}
            buttonName={"Cart"}
            totalItems={totalItems}
            FaIons={<FaCartShopping className="mr-1" />}
          />
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
