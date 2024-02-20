import React, { useEffect, useState } from "react";
import { NavButton } from "../Smallcomponents/NavButton";
import { Button } from "../Smallcomponents/Buttons";
import { Search } from "../Smallcomponents/Searchbar";
import logo from "../images/logo2.png";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import CategoryNavbar from "../Smallcomponents/CategoryNavbar";
import { PurchaseView } from "../Smallcomponents/CardView";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { db } from "../FirebaseConfig/Firebaseconfig";
import { HiOutlineLogout } from "react-icons/hi";

//useCart
import { useCart } from "react-use-cart";
import { signOut } from "firebase/auth";
import { auth } from "../FirebaseConfig/Firebaseconfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Menpage({ userName, totalItems }) {
  const [Menscollection, setMenscollection] = useState([]);
  const [mycategory, setMycategory] = useState(null);
  const { addItem, totalUniqueItems, items, removeItem, emptyCart } = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    let categoryField = mycategory ? "BaseCategory" : "SubCategory";
    let categoryValue = mycategory ? mycategory : "Men's Top Wear";
    const alldata = onSnapshot(
      query(
        collection(db, "MyProducts"),
        where(categoryField, "==", categoryValue)
      ),
      async (snapshort) => {
        const data = snapshort.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMenscollection(data);
      }
    );
    console.log(mycategory);
    return () => alldata();
  }, [mycategory]);
  //   console.log(Menscollection);
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
            <NavButton buttonName={"Home"} page={"/Home"} />
            <NavButton buttonName={"Men"} />
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
        <div className="w-full  h-fit grid grid-cols-3">
          {Menscollection ? (
            Menscollection.map((e, index) => {
              return (
                <div>
                  <PurchaseView
                    key={index}
                    image={e.ProductImage}
                    name={e.ProductName}
                    price={e.ProductPrice}
                    discription={e.ProductDescription}
                  />
                  <button
                    className="p-3 bg-red-800"
                    onClick={() =>
                      addItem({
                        id: e.id,
                        ProductImage: e.ProductImage,
                        ProductName: e.ProductName,
                        ProductDescription: e.ProductDescription,
                        price: e.ProductPrice,
                        DiscountedPrice: e.DiscountedPrice,
                        Category: e.Category,
                        SubCategory: e.SubCategory,
                        BaseCategory: e.BaseCategory,
                        ProductId: e.uId,
                      })
                    }
                  >
                    Add to cart
                  </button>
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

export default Menpage;
