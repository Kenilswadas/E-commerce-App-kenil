import React from "react";
//table from material ui
import CustomizedTables from "../Smallcomponents/Table";
import { VerticalNavbar } from "../Smallcomponents/VerticalNavbar";
import { Button } from "../Smallcomponents/Buttons";
import Addproductform from "../Smallcomponents/Addproductform";
import { useState } from "react";
import { addDoc, collection, doc, getDocs } from "@firebase/firestore";
import { db, storage } from "../FirebaseConfig/Firebaseconfig";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [displayform, setDisplayform] = useState(false);
  //addProducts function
  const addProducts = () => {
    // alert("ki");
    // setDisplayform("true");
    return <Addproductform />;
  };

  //getProducts function
  const getProducts = async () => {
    alert("ji");
    let arr = [];
    const mycollection = collection(db, "MyProducts");
    const querySnapshot = await getDocs(mycollection);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      arr.push(data);
      console.log(data);
    });
    setItems(arr);
  };

  return (
    <div className="flex">
      <div>
        <VerticalNavbar />
      </div>
      <div className="bg-gray-200 flex flex-col items-center justify-center w-full">
        <Button
          btnName="Add Product"
          clickHandler={() => {
            addProducts();
          }}
        />
        {/* <Button
          btnName="Get Product"
          clickHandler={() => {
            getProducts();
          }}
        /> */}
        <div className="m-10">
          <CustomizedTables />
        </div>
        {addProducts()}
      </div>
    </div>
  );
}

export default Dashboard;
