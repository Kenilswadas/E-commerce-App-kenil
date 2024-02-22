import React from "react";
import { useParams } from "react-router-dom";
import Menpage from "./Menpage";
import Womenspage from "./Womenspage";

function CategoryPage({ userName, totalItems }) {
  const { Category } = useParams();
  return (
    <div>
      {Category === "Men" ? (
        <Menpage userName={userName} totalItems={totalItems} />
      ) : (
        <Womenspage userName={userName} totalItems={totalItems} />
      )}
    </div>
  );
}

export default CategoryPage;
