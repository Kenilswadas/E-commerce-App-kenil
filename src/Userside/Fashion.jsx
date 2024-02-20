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
function Fashion({ userName }) {
  const [Menscollection, setMenscollection] = useState([]);
  const [Womenscollection, setWomenscollection] = useState([]);
  const [Kidscollection, setKidscollection] = useState([]);
  const [beautycollection, setbeautycollection] = useState([]);

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
  return (
    <div>
      <nav className="bg-[#ebf1f1] p-px sticky top-0 shadow-2xl z-50">
        <ul className="flex items-center justify-around">
          <li className="flex">
            <img src={logo} alt="" className="w-auto h-20 p-2" />
          </li>
          <li className="flex items-center w-2/4 ml-8">
            <NavButton buttonName={"Home"} page={"/Home"} />
            <NavButton buttonName={"Men"} page={"/Home/Fashion/Men"} />
            <NavButton buttonName={"Women"} />
            <NavButton buttonName={"Kids"} />
            <NavButton buttonName={"Beauty"} />
          </li>
          <Search />
          <NavButton
            page={"/Admin"}
            buttonName={userName ? userName : localStorage.getItem("userName")}
            FaIons={<FaUserCircle className="mr-1" />}
          />
          <NavButton
            buttonName={"Cart"}
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
          {Womenscollection.map((item) => {
            return (
              <TrendingInFashion
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
          {Menscollection.slice(0, 5).map((item) => {
            return (
              <TrendingInFashion
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
          {Kidscollection.map((item) => {
            return (
              <TrendingInFashion
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
