import React, { useEffect, useState } from "react";
import { VerticalNavbar } from "../Smallcomponents/VerticalNavbar";
// import axios from "axios";

function Maintainorder({ userName }) {
  // const [items, setItems] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get("https://nodejs-products-api.onrender.com/api/products")
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  return (
    <div className="flex bg-gray-200">
      <div>
        <VerticalNavbar userName={userName} />
      </div>
      <div className="flex">
        
      </div>
    </div>
  );
}

export default Maintainorder;
