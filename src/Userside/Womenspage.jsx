import React, { useEffect, useState } from "react";
import { NavButton } from "../Smallcomponents/NavButton";
import { Search } from "../Smallcomponents/Searchbar";
import logo from "../images/logo2.png";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import CategoryNavbar from "../Smallcomponents/CategoryNavbar";
import { PurchaseView } from "../Smallcomponents/CardView";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { db } from "../FirebaseConfig/Firebaseconfig";
import { HiOutlineLogout } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
//useCart
import { useCart } from "react-use-cart";
import { signOut } from "firebase/auth";
import { auth } from "../FirebaseConfig/Firebaseconfig";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Womenspage({ userName, totalItems }) {
  const [Womenscollection, setWomenscollection] = useState([]);
  const [mycategory, setMycategory] = useState(null);
  const navigate = useNavigate();
  let { Category } = useParams();
  const { addItem } = useCart();

  useEffect(() => {
    // console.log("run");
    // let categoryField = mycategory ? "BaseCategory" : "SubCategory";
    // let categoryValue = "Women's Bottom Wear";
    // let combinedCategoryValue =
    //   mycategory === null ? [categoryValue] : ["KALINI"];
    // console.log(mycategory === null);
    // const alldata = onSnapshot(
    //   query(
    //     collection(db, "MyProducts"),
    //     where(categoryField, "in", combinedCategoryValue)
    //   ),
    //   async (snapshort) => {
    //     const data = snapshort.docs.map((doc) => ({
    //       id: doc.id,
    //       ...doc.data(),
    //     }));
    //     setWomenscollection(data);
    //   }
    // );
    const alldata = onSnapshot(collection(db, "MyProducts"), (snapshort) => {
      const data = snapshort.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWomenscollection(data);
    });
    return () => alldata();
  }, [mycategory]);

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
      <div>
        <h1>User Profile</h1>
        <p>User ID: {Category}</p>
      </div>
      <ToastContainer position="top-center" />
      <nav className="bg-[#ebf1f1] p-px sticky top-0 shadow-2xl z-50">
        <ul className="flex items-center justify-around">
          <li className="flex">
            <img src={logo} alt="" className="w-auto h-20 p-2" />
          </li>
          <li className="flex items-center w-2/4 ml-8">
            <NavButton buttonName={"Home"} page={"/"} />
            <NavButton buttonName={"Men"} page={`/Home/Fashion/Men`} />
            <NavButton buttonName={"Women"} page={"/Home/Fashion/Women"} />
            <NavButton buttonName={"Kids"} />
            <NavButton buttonName={"Beauty"} />
          </li>
          <Search />
          {auth.currentUser ? (
            <NavButton
              page={"/Admin"}
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

      <div className="flex">
        <CategoryNavbar setMycategory={setMycategory} />
        <div className="w-full  h-fit grid grid-cols-4">
          {Womenscollection ? (
            Womenscollection.filter((data) =>
              (mycategory === null
                ? [
                    "Women's Top Wear",
                    "Women's Bottom Wear",
                    "Women's Foot Wear",
                    "Women's Festive Wear",
                  ]
                : mycategory
              ).includes(data.SubCategory)
            ).map((e, index) => {
              return (
                <div>
                  <PurchaseView
                    key={index}
                    image={e.ProductImage}
                    name={e.ProductName}
                    price={e.ProductPrice}
                    discription={e.ProductDescription}
                    addItems={addItem}
                    e={e}
                  />
                </div>
              );
            })
          ) : (
            <p>loading</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Womenspage;
