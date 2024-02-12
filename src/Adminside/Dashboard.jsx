import React from "react";
//table from material ui
import CustomizedTables from "../Smallcomponents/Table";
import { VerticalNavbar } from "../Smallcomponents/VerticalNavbar";
import { Button } from "../Smallcomponents/Buttons";
import Addproductform from "../Smallcomponents/Addproductform";
import { useState } from "react";
// import { addDoc, collection, doc, getDocs } from "@firebase/firestore";
// import { db, storage } from "../FirebaseConfig/Firebaseconfig";

function Dashboard({ userName }) {
  // const [items, setItems] = useState([]);
  const [displayform, setDisplayform] = useState(false);
  //addProducts function
  const addProducts = () => {
    if (displayform) {
      setDisplayform(false);
    } else setDisplayform(true);
  };
  console.log(displayform);
  return (
    <div className="flex">
      <div>
        <VerticalNavbar userName={userName} />
      </div>
      <div className="bg-gray-200 flex flex-col items-center justify-center w-full">
        <Button
          btnName="Add Product"
          clickHandler={() => {
            addProducts();
          }}
        />
        <div className="m-10">
          <CustomizedTables setDisplayform={setDisplayform} displayform={displayform} />
        </div>
        {displayform ? (
          <Addproductform setDisplayform={setDisplayform} />
        ) : null}
      </div>
    </div>
  );
}

export default Dashboard;
