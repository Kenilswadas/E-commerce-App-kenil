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
  page1,
  page2,
  page3,
  page4,
  page5,
  searchInput,
  setSearchInput,
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
            <NavButton buttonName={btn1name} page={page1} />
            <NavButton buttonName={btn2name} page={page2} />
            <NavButton buttonName={btn3name} page={page3} />
            <NavButton buttonName={btn4name} page={page4} />
            <NavButton buttonName={btn5name} page={page5} />
          </li>
          <Search setSearchInput={setSearchInput} searchInput={searchInput} />
          {auth.currentUser ? (
            <NavButton
              page={"/UsersProfilePage/Profiledetail"}
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
            page={"/Cartpage"}
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
