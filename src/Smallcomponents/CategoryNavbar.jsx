import React from "react";
import { useParams } from "react-router-dom";
function CategoryNavbar({ setMycategory }) {
  const { CategoryMen, CategoryWomen } = useParams();

  return (
    <div className=" h-screen w-1/6 shadow-3xl bg-[#ebf1f1] ">
      <div className="text-center m-2 font-bold text-[#96200e] border-b-2 border-[#217aa9]">
        {"Filter For "}
        {CategoryMen}
        {CategoryWomen}
      </div>
      {CategoryMen === "Men" ? (
        <div className="p-4 flex flex-col">
          <div>
            <input
              type="checkbox"
              name="Roadster"
              id=""
              className="mr-4"
              onChange={(e) =>
                e.target.checked
                  ? setMycategory("Roadster")
                  : setMycategory(null)
              }
            />
            <label htmlFor="">Roadster</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="U.S. Polo Assn."
              id=""
              className="mr-4"
              onChange={(e) =>
                e.target.checked
                  ? setMycategory("U.S. Polo Assn.")
                  : setMycategory(null)
              }
            />
            <label htmlFor="">U.S. Polo Assn.</label>
          </div>
        </div>
      ) : (
        <div className="p-4 flex flex-col">
          <div>
            <input
              type="checkbox"
              name="Roadster"
              id=""
              className="mr-4"
              onChange={(e) =>
                e.target.checked
                  ? setMycategory("Roadster")
                  : setMycategory(null)
              }
            />
            <label htmlFor="">Roadster</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="U.S. Polo Assn."
              id=""
              className="mr-4"
              onChange={(e) =>
                e.target.checked
                  ? setMycategory("U.S. Polo Assn.")
                  : setMycategory(null)
              }
            />
            <label htmlFor="">U.S. Polo Assn.</label>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryNavbar;
