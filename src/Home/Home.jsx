import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { Search } from "../Smallcomponents/Searchbar";
import { NavButton } from "../Smallcomponents/NavButton";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import AliceCarousel from "react-alice-carousel";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.webp";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();
  const [myimage, setMyimage] = useState(image1);
  useEffect(() => {
    if (localStorage.getItem("usrEmail") === null) {
      navigate("/SignInpage");
    }
  }, []);
  const handleImage = (id) => {
    id == 1 ? setMyimage(image1) : setMyimage(image2);
  };
  return (
    <div className="bg-[#D9D9D9]">
      <nav className="bg-[#D9D9D9] p-2">
        <ul className="flex items-center justify-around">
          <li className="flex">
            <img src={logo} alt="" className="w-auto h-20" />
          </li>
          <li className="flex items-center w-2/4 ml-8">
            <NavButton buttonName={"Grocery"} />
            <NavButton buttonName={"Electronic"} />
            <NavButton buttonName={"Fashion"} />
            <NavButton buttonName={"Mobiles"} />
            <NavButton buttonName={"Travel"} />
          </li>
          <Search />
          <NavButton
            buttonName={"My Profile"}
            FaIons={<FaUserCircle className="mr-1" />}
          />
          <NavButton
            buttonName={"Cart"}
            FaIons={<FaCartShopping className="mr-1" />}
          />
        </ul>
      </nav>
      <div className="bg-red-200 h-96 text-center">
        <img src={myimage} alt="" className="h-96 " />
        <button onClick={() => handleImage(1)} className="p-4 ">
          <FaArrowAltCircleLeft size={40} />
        </button>
        <button onClick={() => handleImage(2)} className="p-4 ">
          <FaArrowAltCircleRight size={40} />
        </button>
      </div>
      <div className="bg-[#E0CCBE] h-96 m-16">
        <p className="text-center pt-10">MEDEL WORTHY BRANDS TO BAG</p>
        <div className="flex m-10 mt-0 items-center justify-between">
          <div className="bg-red-500 w-56 m-4 p-2 rounded-xl">
            <p className="bg-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium ipsa fugit delectus suscipit. Voluptatem incidunt
              magnam facilis maiores inventore expedita ut itaque libero
              consequatur. Est minima molestias autem dicta consequuntur.
            </p>
            <p>hello</p>
          </div>
          <div className="bg-red-500 w-56 m-4 p-2 rounded-xl">
            <p className="bg-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium ipsa fugit delectus suscipit. Voluptatem incidunt
              magnam facilis maiores inventore expedita ut itaque libero
              consequatur. Est minima molestias autem dicta consequuntur.
            </p>
            <p>hello</p>
          </div>
          <div className="bg-red-500 w-56 m-4 p-2 rounded-xl">
            <p className="bg-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium ipsa fugit delectus suscipit. Voluptatem incidunt
              magnam facilis maiores inventore expedita ut itaque libero
              consequatur. Est minima molestias autem dicta consequuntur.
            </p>
            <p>hello</p>
          </div>
          <div className="bg-red-500 w-56 m-4 p-2 rounded-xl">
            <p className="bg-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium ipsa fugit delectus suscipit. Voluptatem incidunt
              magnam facilis maiores inventore expedita ut itaque libero
              consequatur. Est minima molestias autem dicta consequuntur.
            </p>
            <p>hello</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
