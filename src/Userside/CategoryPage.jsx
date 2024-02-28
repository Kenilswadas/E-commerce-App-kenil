import React from "react";
import { useParams } from "react-router-dom";
import Menpage from "./Menpage";
import Womenspage from "./Womenspage";

function CategoryPage({ userName, totalItems ,searchInput ,setSearchInput }) {
  const { Category } = useParams();
  return (
    <div>
      {Category === "Men" ? (
        <Menpage userName={userName} totalItems={totalItems} setSearchInput={setSearchInput} searchInput={searchInput} />
      ) : (
        <Womenspage userName={userName} totalItems={totalItems} />
      )}
    </div>
  );
}

export default CategoryPage;
