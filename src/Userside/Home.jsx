import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo2.png";
import { Search } from "../Smallcomponents/Searchbar";
import { NavButton } from "../Smallcomponents/NavButton";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
//carousel images
import image from "../images/backgroundcolorpic.png";

import Carouselimage01 from "../images/Carouselimages/Carouselimage01.jpg";
import Carouselimage02 from "../images/Carouselimages/Carouselimage02.webp";
import Carouselimage03 from "../images/Carouselimages/Carouselimage03.webp";
import Carouselimage04 from "../images/Carouselimages/Carouselimage04.webp";
import Carouselimage05 from "../images/Carouselimages/Carouselimage05.webp";
import Carouselimage06 from "../images/Carouselimages/Carouselimage08.jpg";
import Carouselimage07 from "../images/Carouselimages/Carouselimage09.webp";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { auth, db } from "../FirebaseConfig/Firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { HiOutlineLogout } from "react-icons/hi";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import {
  BrandsToBag,
  TrendingInFashion,
  TrendingInGrocery,
} from "../Smallcomponents/CardView";
// import Tv_32inchs from "../images/BrandsToBag/32._SY116_CB584962515_.jpg";
// import Tv_43inchs from "../images/BrandsToBag/43._SY116_CB584962515_.jpg";
// import Tv_55inchs from "../images/BrandsToBag/55._SY116_CB584962515_.jpg";
// import Tv_65inchs from "../images/BrandsToBag/65._SY116_CB584962515_.jpg";
// import KitchenItem1 from "../images/BrandsToBag/KicthenItem1.jpg";
// import KitchenItem2 from "../images/BrandsToBag/KicthenItem2.jpg";
// import KitchenItem3 from "../images/BrandsToBag/KicthenItem3.jpg";
// import KitchenItem4 from "../images/BrandsToBag/KicthenItem4.jpg";
// import MenCategory1 from "../images/BrandsToBag/MenCategory1.jpg";
// import MenCategory2 from "../images/BrandsToBag/MenCategory2.jpg";
// import MenCategory3 from "../images/BrandsToBag/MenCategory3.jpg";
// import MenCategory4 from "../images/BrandsToBag/MenCategory4.jpg";
// import WomenCategory1 from "../images/BrandsToBag/WomenCategory1.jpg";
// import WomenCategory2 from "../images/BrandsToBag/WomenCategory2.jpg";
// import WomenCategory3 from "../images/BrandsToBag/WomenCategory3.jpg";
// import WomenCategory4 from "../images/BrandsToBag/WomenCategory4.jpg";
// import TrendingImage1 from "../images/TrendingInFashion/TrendingImage1.jpg";
// import TrendingImage2 from "../images/TrendingInFashion/TrendingImage2.jpg";
// import TrendingImage3 from "../images/TrendingInFashion/TrendingImage3.jpg";
// import TrendingImage4 from "../images/TrendingInFashion/TrendingImage4.jpg";
// import GroceryItem1 from "../images/TrendingInGrocery/GroceryItem1.webp";
// import GroceryItem2 from "../images/TrendingInGrocery/GroceryItem2.webp";
// import GroceryItem3 from "../images/TrendingInGrocery/GroceryItem3.webp";
// import GroceryItem4 from "../images/TrendingInGrocery/GroceryItem4.webp";
// import GroceryLogo1 from "../images/TrendingInGrocery/GroceryLogo1.webp";
// import GroceryLogo2 from "../images/TrendingInGrocery/GroceryLogo2.webp";
// import GroceryLogo3 from "../images/TrendingInGrocery/GroceryLogo3.webp";
// import GroceryLogo4 from "../images/TrendingInGrocery/GroceryLogo4.webp";
// Storage
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../FirebaseConfig/Firebaseconfig";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
//Travel image
import TravelImage from "../images/TravelSectionImage.png";
import BgImage from "../Smallcomponents/BgImage";
function Home({ userName }) {
  // const [image, setImage] = useState();
  // const [userName, setUserName] = useState("");
  // console.log(image);
  const [Carousel, setCarousel] = useState(Carouselimage01);
  const [imageList, setImageList] = useState([]);
  const [Menscollection, setMenscollection] = useState([]);
  const [Womenscollection, setWomenscollection] = useState([]);
  const [GroceryCollection, setGroceryCollection] = useState([]);
  const [url, setUrl] = useState([]);

  const items = [
    <img src={Carouselimage01} alt="" className="w-full h-96  " />,
    <img src={Carouselimage02} alt="" className="w-full h-96  " />,
    <img src={Carouselimage07} alt="" className="w-full h-96  " />,
    <img src={Carouselimage03} alt="" className="w-full h-96  " />,
    <img src={Carouselimage04} alt="" className="w-full h-96  " />,
    <img src={Carouselimage05} alt="" className="w-full h-96  " />,
    <img src={Carouselimage06} alt="" className="w-full h-96  " />,
  ];
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
    // fetch data from fireStore
    // const imagelistRef = ref(storage, `/`);
    // listAll(imagelistRef).then((response) => {
    //   response.items.map((item) => {
    //     return getDownloadURL(item).then((url) => {
    //       setImageList((prev) => [...prev, url]);
    //     });
    //   });
    // });
    const q = query(
      collection(db, "MyProducts"),
      where("SubCategory", "==", "Women's Top Wear")
    );
    const querySnapshot = getDocs(q);
    // console.log(querySnapshot);
    // querySnapshot.then((data) => {
    //   data.docs.map((items) => {
    //     const docdata = items.data();
    //     console.log(items.id);
    //     console.log(docdata);
    //     return setImageList((prev) => [...prev, docdata]);
    //   });
    // });

    //Men Top Wear
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

    //Women Top Wear
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
    //Grocery collection
    onSnapshot(
      query(collection(db, "MyProducts"), where("Category", "==", "Grocery")),
      async (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGroceryCollection(data);
      }
    );
    //logo from storage
    const imageRef = ref(storage, `/Grocery`);
    listAll(imageRef)
      .then((images) => [
        images.items.map((item) => {
          getDownloadURL(item).then((url) => {
            // return console.log(url);
            setUrl((prev) => [...prev, url]);
          });
        }),
      ])
      .catch((error) => {
        console.log(error);
      });
  }, [navigate]);

  //image carousel
  const handleImage = (id) => {};

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
  // console.log(auth);
  return (
    <div className="bg-[#ffffff] m-0">
      {/* <input
        type="file"
        name=""
        id=""
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button onClick={upload} className="bg-red-200 mr-5">
        Upload
      </button> */}
      <nav className="bg-[#ebf1f1] p-px sticky top-0 shadow-2xl z-50">
        <ul className="flex items-center justify-around">
          <li className="flex">
            <img src={logo} alt="" className="w-auto h-20 p-2" />
          </li>
          <li className="flex items-center w-2/4 ml-8">
            <NavButton buttonName={"Grocery"} />
            <NavButton buttonName={"Electronic"} />
            <NavButton buttonName={"Fashion"} page={"/Home/Fashion"} />
            <NavButton buttonName={"Mobiles"} />
            <NavButton buttonName={"Travel"} />
          </li>
          <Search />
          <NavButton
            page={"/Admin"}
            buttonName={userName ? userName : localStorage.getItem("userName")}
            FaIons={<FaUserCircle className="mr-1" />}
          />
          <NavButton
            buttonName={"LogOut"}
            clickHandler={handleLogout}
            FaIons={<HiOutlineLogout />}
          />
          <NavButton
            buttonName={"Cart"}
            FaIons={<FaCartShopping className="mr-1" />}
          />
        </ul>
      </nav>
      {/* image Carousel */}
      <div className="m-5">
        <AliceCarousel
          items={items}
          keyboardNavigation={true}
          autoPlay={AliceCarousel}
          autoPlayInterval={2000}
        />
      </div>
      {/* BMEDEL WORTHY BRANDS TO BAG */}
      <div className="bg-white h-full m-16 ">
        <p className="flex justify-center item-center bg-[#ebf1f1] pt-4 text-[#217aa9] opacity-100 mb-2 p-4 ">
          BRANDS TO BAG{" "}
        </p>

        <div className="flex m-6 mt-0 items-center justify-between w-fit ">
          {/* <BrandsToBag
            image1={imageList.map((e) => e.ProductImage).slice(2, 3)}
            image2={imageList.map((e) => e.ProductImage).slice(3, 4)}
            image3={imageList.map((e) => e.ProductImage).slice(4, 5)}
            image4={imageList.map((e) => e.ProductImage).slice(4, 5)}
          />
          <BrandsToBag
            image1={imageList.map((e) => e.ProductImage).slice(2, 3)}
            image2={imageList.map((e) => e.ProductImage).slice(3, 4)}
            image3={imageList.map((e) => e.ProductImage).slice(4, 5)}
            image4={imageList.map((e) => e.ProductImage).slice(4, 5)}
          />
          <BrandsToBag
            image1={imageList.map((e) => e.ProductImage).slice(2, 3)}
            image2={imageList.map((e) => e.ProductImage).slice(3, 4)}
            image3={imageList.map((e) => e.ProductImage).slice(4, 5)}
            image4={imageList.map((e) => e.ProductImage).slice(4, 5)}
          />
          <BrandsToBag
            image1={imageList.map((e) => e.ProductImage).slice(2, 3)}
            image2={imageList.map((e) => e.ProductImage).slice(3, 4)}
            image3={imageList.map((e) => e.ProductImage).slice(4, 5)}
            image4={imageList.map((e) => e.ProductImage).slice(4, 5)}
          /> */}
          {Womenscollection.length > 0 ? (
            <BrandsToBag
              image1={Womenscollection[0].ProductImage}
              image2={Womenscollection[1].ProductImage}
              image3={Womenscollection[2].ProductImage}
              image4={Womenscollection[3].ProductImage}
            />
          ) : null}
          {Menscollection.length > 0 ? (
            <BrandsToBag
              image1={Menscollection[0].ProductImage}
              image2={Menscollection[1].ProductImage}
              image3={Menscollection[2].ProductImage}
              image4={Menscollection[3].ProductImage}
            />
          ) : null}
          {Womenscollection.length > 0 ? (
            <BrandsToBag
              image1={Womenscollection[0].ProductImage}
              image2={Womenscollection[1].ProductImage}
              image3={Womenscollection[2].ProductImage}
              image4={Womenscollection[3].ProductImage}
            />
          ) : null}
          {Womenscollection.length > 0 ? (
            <BrandsToBag
              image1={Menscollection[0].ProductImage}
              image2={Menscollection[1].ProductImage}
              image3={Menscollection[2].ProductImage}
              image4={Menscollection[3].ProductImage}
            />
          ) : null}
        </div>
      </div>
      {/* TREANDING IN FASHION WOMEN'S COLLECTION  */}
      <div className="bg-white m-16">
        <p className="flex justify-center item-center bg-[#ebf1f1] pt-4 text-[#217aa9] opacity-100 mb-2 p-4">
          WOMEN'S COLLECTION
        </p>
        <div className="flex m-6 mt-0 items-center justify-between"></div>
      </div>{" "}
      <div className="bg-white m-16">
        <p className="flex justify-center item-center bg-[#ebf1f1] pt-4 text-[#217aa9] opacity-100 mb-2 p-4">
          MEN'S COLLECTION
        </p>
        <div className="flex m-6 mt-0 items-center justify-between"></div>
      </div>
      {/* TRENDING IN GROCERY */}
      <div className="bg-white h-full m-16">
        <p className="flex justify-center item-center bg-[#ebf1f1] pt-4 text-[#217aa9] opacity-100 mb-2 p-4  ">
          TREANDING IN GROCERY
        </p>
        <div className="flex m-6 mt-0 items-center justify-between bg-gray-200">
          {/* <TrendingInGrocery logo={GroceryLogo1} image={GroceryItem1} />
          <TrendingInGrocery logo={GroceryLogo2} image={GroceryItem2} />
          <TrendingInGrocery logo={GroceryLogo3} image={GroceryItem3} />
          <TrendingInGrocery logo={GroceryLogo4} image={GroceryItem4} /> */}
        </div>
      </div>
      {/* {imageList.map((url, index) => {
        return <img key={index} src={`url`} alt="" />;
      })} */}
      {/* Travel section */}
      <div className="relative m-16">
        <img
          src={TravelImage}
          alt=""
          className="w- h-fit object-cover hover:bg-black"
        />
        <div
          onClick={() => {
            alert("mo");
          }}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-300 cursor-pointer"
        >
          <span className="text-white text-4xl cursor-pointer">
            + Explore more
          </span>
        </div>
      </div>
    </div>
  );
}

export default Home;
