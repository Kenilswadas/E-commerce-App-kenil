import React from "react";
import { useParams } from "react-router-dom";
import Menpage from "./Menpage";
import Womenspage from "./Womenspage";

function CategoryPage({
  userName,
  totalItems,
  searchInput,
  setSearchInput,
  mycollection,
}) {
  const { Category } = useParams();
  return (
    <div>
      {Category === "Men" ? (
        <Menpage
          mycollection={mycollection}
          userName={userName}
          totalItems={totalItems}
          setSearchInput={setSearchInput}
          searchInput={searchInput}
        />
      ) : (
        <Womenspage
          mycollection={mycollection}
          userName={userName}
          totalItems={totalItems}
          setSearchInput={setSearchInput}
          searchInput={searchInput}
        />
      )}
    </div>
  );
}

export default CategoryPage;
