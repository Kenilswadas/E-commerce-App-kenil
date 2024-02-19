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
function Menpage({ userName }) {
  const [Menscollection, setMenscollection] = useState([]);
  const [mycategory, setMycategory] = useState(null);
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
            buttonName={"Cart"}
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
                <PurchaseView
                  key={index}
                  image={e.ProductImage}
                  name={e.ProductName}
                  price={e.ProductPrice}
                  discription={e.ProductDescription}
                />
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
