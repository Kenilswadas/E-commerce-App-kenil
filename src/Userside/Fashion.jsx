import React from "react";
import { useState } from "react";
import logo from "../images/logo2.png";
import simpleimage1 from "../images/Fashion page/simpleimage1.webp";
import { NavButton } from "../Smallcomponents/NavButton";
import { Search } from "../Smallcomponents/Searchbar";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../FirebaseConfig/Firebaseconfig";
import {
  TrendingInFashion,
  TrendingInGrocery,
} from "../Smallcomponents/CardView";
import { HiOutlineLogout } from "react-icons/hi";
import { signOut } from "firebase/auth";
import { auth } from "../FirebaseConfig/Firebaseconfig";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Fashion({ userName, totalItems, setSearchInput, searchInput }) {
  const [Menscollection, setMenscollection] = useState([]);
  const [Womenscollection, setWomenscollection] = useState([]);
  const [Kidscollection, setKidscollection] = useState([]);
  const [beautycollection, setbeautycollection] = useState([]);

  const navigate = useNavigate();
  //fetch products

  //fetch Womenscollection
  onSnapshot(
    query(
      collection(db, "MyProducts"),
      where("SubCategory", "==", "Women's Top Wear")
    ),
    async (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWomenscollection(data);
    }
  );
  //fetch Menscollection
  onSnapshot(
    query(
      collection(db, "MyProducts"),
      where("SubCategory", "==", "Men's Top Wear")
    ),
    async (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMenscollection(data);
    }
  );
  //fetch Kidscollection
  onSnapshot(
    query(
      collection(db, "MyProducts"),
      where("SubCategory", "==", "Boy's Clothing")
    ),
    async (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setKidscollection(data);
    }
  );
  //fetch beautycollection
  onSnapshot(
    query(
      collection(db, "MyProducts"),
      where("SubCategory", "==", "Beauty Product")
    ),
    async (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setbeautycollection(data);
    }
  );
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
            <NavButton buttonName={"Home"} page={"/"} />
            <NavButton buttonName={"Men"} page={"/Home/Fashion/Men"} />
            <NavButton buttonName={"Women"} page={"/Home/Fashion/Women"} />
            <NavButton buttonName={"Kids"} />
            <NavButton buttonName={"Beauty"} />
          </li>
          <Search setSearchInput={setSearchInput} searchInput={searchInput} />
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
          <NavButton
            buttonName={"LogOut"}
            clickHandler={handleLogout}
            FaIons={<HiOutlineLogout />}
          />
          <NavButton
            page={"/Home/Fashion/Men/Cartpage"}
            buttonName={"Cart"}
            totalItems={totalItems}
            FaIons={<FaCartShopping className="mr-1" />}
          />
        </ul>
      </nav>
      {/* fashion main div */}
      <div>
        <img src={simpleimage1} alt="" />
      </div>
      {/* Womenscollection */}
      <div className="flex flex-col m-16">
        <p className="flex justify-center item-center bg-[#ebf1f1] pt-4 text-[#217aa9] opacity-100 mb-2 p-4">
          WOMEN'S COLLECTION
        </p>
        <div className="flex">
          {Womenscollection.slice(0, 5).map((item, index) => {
            return (
              <TrendingInFashion
                key={index}
                image={item.ProductImage}
                name={item.ProductName}
              />
            );
          })}
        </div>
      </div>
      {/* Menscollection */}
      <div className="flex flex-col m-16">
        <p className="flex justify-center item-center bg-[#ebf1f1] pt-4 text-[#217aa9] opacity-100 mb-2 p-4">
          MEN'S COLLECTION
        </p>
        <div className="flex">
          {Menscollection.slice(0, 5).map((item, index) => {
            return (
              <TrendingInFashion
                key={index}
                image={item.ProductImage}
                name={item.ProductName}
                page={"/Home/Fashion/Men"}
              />
            );
          })}
        </div>
      </div>
      {/* Kidscollection */}
      <div className="flex flex-col m-16">
        <p className="flex justify-center item-center bg-[#ebf1f1] pt-4 text-[#217aa9] opacity-100 mb-2 p-4">
          KID'S COLLECTION
        </p>
        <div className="flex">
          {Kidscollection.map((item, index) => {
            return (
              <TrendingInFashion
                key={index}
                image={item.ProductImage}
                name={item.ProductName}
              />
            );
          })}
        </div>
      </div>
      {/* Beautycollection */}
      <div className="flex flex-col m-16">
        <p className="flex justify-center item-center bg-[#ebf1f1] pt-4 text-[#217aa9] opacity-100 mb-2 p-4">
          KID'S COLLECTION
        </p>
        <div className="flex">
          {beautycollection.map((item) => {
            return <TrendingInGrocery image={item.ProductImage} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Fashion;
