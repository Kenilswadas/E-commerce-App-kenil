import React from "react";
import { useParams } from "react-router-dom";
function CategoryNavbar({ setMycategory }) {
  const { Category } = useParams();

  return (
    <div className=" h-screen w-1/6 shadow-3xl bg-[#ebf1f1] text-sm ">
      <div className="text-center m-2 font-bold text-[#96200e] border-b-2 border-[#217aa9]">
        {"Filter For "}
        {Category}
      </div>
      {Category === "Men" ? (
        <div className="p-4 flex flex-col">
          <div>
            <input
              type="checkbox"
              name="Men's Top Wear"
              id=""
              className="mr-4"
              onChange={(e) =>
                e.target.checked
                  ? setMycategory("Men's Top Wear")
                  : setMycategory(null)
              }
            />
            <label htmlFor="">Men's Top Wear</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="Men's Bottom Wear"
              id=""
              className="mr-4"
              onChange={(e) =>
                e.target.checked
                  ? setMycategory("Men's Bottom Wear")
                  : setMycategory(null)
              }
            />
            <label htmlFor="">Men's Bottom Wear</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="Men's Foot Wear"
              id=""
              className="mr-4"
              onChange={(e) =>
                e.target.checked
                  ? setMycategory("Men's Foot Wear")
                  : setMycategory(null)
              }
            />
            <label htmlFor="">Men's Foot Wear</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="Men's Festive Wear"
              id=""
              className="mr-4"
              onChange={(e) =>
                e.target.checked
                  ? setMycategory("Men's Festive Wear")
                  : setMycategory(null)
              }
            />
            <label htmlFor="">Men's Festive Wear</label>
          </div>
        </div>
      ) : (
        <div className="p-4 flex flex-col">
          <div>
            <input
              type="checkbox"
              name="Women's Top Wear"
              id=""
              className="mr-4"
              onChange={(e) =>
                e.target.checked
                  ? setMycategory("Women's Top Wear")
                  : setMycategory(null)
              }
            />
            <label htmlFor="">Women's Top Wear</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="Women's Bottom Wear"
              id=""
              className="mr-4"
              onChange={(e) =>
                e.target.checked
                  ? setMycategory("Women's Bottom Wear")
                  : setMycategory(null)
              }
            />
            <label htmlFor="">Women's Bottom Wear</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="Women's Foot Wear"
              id=""
              className="mr-4"
              onChange={(e) =>
                e.target.checked
                  ? setMycategory("Women's Foot Wear")
                  : setMycategory(null)
              }
            />
            <label htmlFor="">Women's Foot Wear</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="Women's Festive Wear"
              id=""
              className="mr-4"
              onChange={(e) =>
                e.target.checked
                  ? setMycategory("Women's Festive Wear")
                  : setMycategory(null)
              }
            />
            <label htmlFor="">Women's Festive Wear</label>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryNavbar;
