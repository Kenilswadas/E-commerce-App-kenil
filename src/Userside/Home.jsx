import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { Search } from "../Smallcomponents/Searchbar";
import { NavButton } from "../Smallcomponents/NavButton";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.webp";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { auth } from "../FirebaseConfig/Firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import {
  BrandsToBag,
  TrendingInFashion,
  TrendingInGrocery,
} from "../Smallcomponents/CardView";
import Tv_32inchs from "../images/BrandsToBag/32._SY116_CB584962515_.jpg";
import Tv_43inchs from "../images/BrandsToBag/43._SY116_CB584962515_.jpg";
import Tv_55inchs from "../images/BrandsToBag/55._SY116_CB584962515_.jpg";
import Tv_65inchs from "../images/BrandsToBag/65._SY116_CB584962515_.jpg";
import KitchenItem1 from "../images/BrandsToBag/KicthenItem1.jpg";
import KitchenItem2 from "../images/BrandsToBag/KicthenItem2.jpg";
import KitchenItem3 from "../images/BrandsToBag/KicthenItem3.jpg";
import KitchenItem4 from "../images/BrandsToBag/KicthenItem4.jpg";
import MenCategory1 from "../images/BrandsToBag/MenCategory1.jpg";
import MenCategory2 from "../images/BrandsToBag/MenCategory2.jpg";
import MenCategory3 from "../images/BrandsToBag/MenCategory3.jpg";
import MenCategory4 from "../images/BrandsToBag/MenCategory4.jpg";
import WomenCategory1 from "../images/BrandsToBag/WomenCategory1.jpg";
import WomenCategory2 from "../images/BrandsToBag/WomenCategory2.jpg";
import WomenCategory3 from "../images/BrandsToBag/WomenCategory3.jpg";
import WomenCategory4 from "../images/BrandsToBag/WomenCategory4.jpg";
// import TrendingImage1 from "../images/TrendingInFashion/TrendingImage1.jpg";
// import TrendingImage2 from "../images/TrendingInFashion/TrendingImage2.jpg";
// import TrendingImage3 from "../images/TrendingInFashion/TrendingImage3.jpg";
// import TrendingImage4 from "../images/TrendingInFashion/TrendingImage4.jpg";
import GroceryItem1 from "../images/TrendingInGrocery/GroceryItem1.webp";
import GroceryItem2 from "../images/TrendingInGrocery/GroceryItem2.webp";
import GroceryItem3 from "../images/TrendingInGrocery/GroceryItem3.webp";
import GroceryItem4 from "../images/TrendingInGrocery/GroceryItem4.webp";
import GroceryLogo1 from "../images/TrendingInGrocery/GroceryLogo1.webp";
import GroceryLogo2 from "../images/TrendingInGrocery/GroceryLogo2.webp";
import GroceryLogo3 from "../images/TrendingInGrocery/GroceryLogo3.webp";
import GroceryLogo4 from "../images/TrendingInGrocery/GroceryLogo4.webp";
// Storage
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../FirebaseConfig/Firebaseconfig";
function Home({ userName }) {
  // const [image, setImage] = useState();
  // const [userName, setUserName] = useState("");

  // console.log(image);
  const [imageList, setImageList] = useState([]);
  // function upload() {
  //   console.log(image);
  //   const ImageRef = ref(storage, `Images/${image.name}`);
  //   uploadBytes(ImageRef, image);
  // }

  // const imageListRef = ref(storage, "/");
  // listAll(imageListRef).then((response) => {
  //   response.items.forEach((item) => {
  //     getDownloadURL(item).then((url) => {
  //       setImageList((prev) => [...prev, url]);
  //     });
  //   });
  // });

  const navigate = useNavigate();
  const [myimage, setMyimage] = useState(image1);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        // console.log(user);

        navigate("/");
      } else {
        // console.log(user);
        // setUserName(auth.currentUser.displayName);
      }
    });
    //fetch data from fireStore
    const imagelistRef = ref(storage, `/`);
    listAll(imagelistRef).then((response) => {
      response.items.map((item) => {
        return getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  });
  const handleImage = (id) => {
    id === 1 ? setMyimage(image1) : setMyimage(image2);
  };
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
  console.log(auth);
  return (
    <div className="bg-[#D9D9D9]">
      {/* <input
        type="file"
        name=""
        id=""
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button onClick={upload} className="bg-red-200 mr-5">
        Upload
      </button> */}
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
            <button onClick={handleLogout}>log me out</button>
          </li>
          <Search />
          <NavButton
            page={"/Admin"}
            buttonName={auth.currentUser ? userName : null}
            FaIons={<FaUserCircle className="mr-1" />}
          />
          <NavButton
            buttonName={"Cart"}
            FaIons={<FaCartShopping className="mr-1" />}
          />
        </ul>
      </nav>
      {/* image Carousel */}
      <div className="bg-red-200 h-96 text-center">
        <img src={myimage} alt="" className="h-96 " />
        <button onClick={() => handleImage(1)} className="p-4 ">
          <FaArrowAltCircleLeft size={40} />
        </button>
        <button onClick={() => handleImage(2)} className="p-4 ">
          <FaArrowAltCircleRight size={40} />
        </button>
      </div>
      {/* BMEDEL WORTHY BRANDS TO BAG */}
      <div className="bg-white h-80 m-16">
        <p className="text-center bg-red-100 pt-4 text-[#747264]">
          MEDEL WORTHY BRANDS TO BAG
        </p>
        <div className="flex m-6 mt-0 items-center justify-between">
          <BrandsToBag
            image1={Tv_32inchs}
            image2={Tv_43inchs}
            image3={Tv_55inchs}
            image4={Tv_65inchs}
          />
          <BrandsToBag
            image1={MenCategory1}
            image2={MenCategory2}
            image3={MenCategory3}
            image4={MenCategory4}
          />
          <BrandsToBag
            image1={KitchenItem1}
            image2={KitchenItem2}
            image3={KitchenItem3}
            image4={KitchenItem4}
          />
          <BrandsToBag
            image1={WomenCategory1}
            image2={WomenCategory2}
            image3={WomenCategory3}
            image4={WomenCategory4}
          />
        </div>
      </div>
      {/* TREANDING IN FASHION */}
      <div className="bg-white m-16">
        <p className="text-center mb-1 bg-red-100 pt-4 text-[#747264]">
          TREANDING IN FASHION
        </p>
        <div className="flex m-6 mt-0 items-center justify-between">
          <TrendingInFashion image={imageList[0]} />
          <TrendingInFashion image={imageList[1]} />
          <TrendingInFashion image={imageList[2]} />
          <TrendingInFashion image={imageList[3]} />
        </div>
      </div>
      {/* TRENDING IN GROCERY */}
      <div className="bg-white h-80 m-16">
        <p className="text-center mb-1 bg-red-100 pt-4 text-[#747264] ">
          TREANDING IN GROCERY
        </p>
        <div className="flex m-6 mt-0 items-center justify-between">
          <TrendingInGrocery logo={GroceryLogo1} image={GroceryItem1} />
          <TrendingInGrocery logo={GroceryLogo2} image={GroceryItem2} />
          <TrendingInGrocery logo={GroceryLogo3} image={GroceryItem3} />
          <TrendingInGrocery logo={GroceryLogo4} image={GroceryItem4} />
        </div>
      </div>
      {imageList.map((url, index) => {
        return <img key={index} src={`url`} alt="" />;
      })}
    </div>
  );
}

export default Home;
