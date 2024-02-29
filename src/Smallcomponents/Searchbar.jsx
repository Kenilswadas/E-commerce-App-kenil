import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useRef } from "react";
import { db } from "../FirebaseConfig/Firebaseconfig";
import { collection, onSnapshot } from "@firebase/firestore";
const Search = ({ searchInput, setSearchInput }) => {
  const catagoryData = [
    "Men's Top Wear",
    "Men's Bottom Wear",
    "Men's Foot Wear",
    "Men's Festive Wear",
  ];
  useEffect(() => {
    const alldata = onSnapshot(collection(db, "MyProducts"), (snapshort) => {
      const data = snapshort.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const menData = data.filter((e) => catagoryData.includes(e.SubCategory));
      setProducts(menData);
    });
    return () => alldata();
  }, []);
  const [Products, setProducts] = useState();
  const refSearch = useRef();

  //handleSearch
  function searchHandle() {
    const search = refSearch.current.value.toLowerCase();
    console.log(search);
    if (search.length > 3) {
      const finaldata = Products.filter((data) =>
        data.SubCategory.toLowerCase().includes(search)
      );
      console.log(finaldata);
      setSearchInput(finaldata);
    }
  }
  return (
    <li className="flex bg-white items-center   rounded-full">
      <input
        ref={refSearch}
        type="text"
        className="rounded-full p-1 pl-4 border-none focus:outline-none"
        placeholder="Search by SubCategory"
        onChange={searchHandle}
      />
      <IoIosSearch size={24} className="mr-4" />
    </li>
  );
};

export { Search };
