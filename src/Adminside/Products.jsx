import React from "react";
import { VerticalNavbar } from "../Smallcomponents/VerticalNavbar";

function Products({userName}) {
  return (
    <div className="flex bg-gray-200">
      <div>
        <VerticalNavbar userName={userName} />
      </div>
    </div>
  );
}

export default Products;
