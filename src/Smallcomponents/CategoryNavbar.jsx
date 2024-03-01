import React from "react";
import { useParams } from "react-router-dom";
//material ui
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function CategoryNavbar({ setMycategory, mycategory, catagoryData }) {
  const { Category } = useParams();

  //material ui
  const marks = [
    {
      value: 1000,
      label: "1000",
    },
    {
      value: 2000,
      label: "2000",
    },
    {
      value: 3000,
      label: "3000",
    },
    {
      value: 4000,
      label: "4000",
    },
    {
      value: 5000,
      label: "5000",
    },
  ];
  function valuetext(value) {
    return `${value}Rs`;
  }
  return (
    <div className="  w-1/6 h-fit-sc shadow-3xl bg-[#ebf1f1] text-sm ">
      <div className="text-center m-2 font-bold text-[#96200e] border-b-2 border-[#217aa9]">
        {"Filter For "}
        {Category}
      </div>
      {Category === "Men" ? (
        <div className="p-4 flex flex-col">
          <div>
            {catagoryData.map((e, index) => {
              return (
                <div key={index}>
                  <input
                    type="checkbox"
                    name="Men's Top Wear"
                    id=""
                    className="mr-4"
                    onChange={(event) =>
                      event.target.checked
                        ? setMycategory((prev) => [
                            ...prev,
                            catagoryData[index],
                          ])
                        : setMycategory((prev) => {
                            const newCategory = [...mycategory];
                            newCategory.splice(mycategory.indexOf(e), 1);
                            return newCategory;
                          })
                    }
                  />
                  <label htmlFor="">{e}</label>
                </div>
              );
            })}
          </div>
          <label className="mt-5 pt-2 border-t-2 border-[#217aa9]" htmlFor="">
            {"Price Filter"}
          </label>
          <Box sx={{ width: "fit" }}>
            <Slider
              aria-label="Custom marks"
              defaultValue={1000}
              getAriaValueText={valuetext}
              step={1000}
              min={1000}
              max={5000}
              valueLabelDisplay="auto"
              marks={marks}
            />
            {}
          </Box>
        </div>
      ) : (
        <div className="p-4 flex flex-col">
          <div>
            {catagoryData.map((e) => {
              return (
                <div>
                  <input
                    type="checkbox"
                    name="Men's Top Wear"
                    id=""
                    className="mr-4"
                    onChange={(event, index) =>
                      event.target.checked
                        ? setMycategory((prev) => [...prev, e])
                        : setMycategory((prev) => {
                            const newCategory = [...mycategory];
                            newCategory.splice(mycategory.indexOf(e), 1);
                            return newCategory;
                          })
                    }
                  />
                  <label htmlFor="">{e}</label>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryNavbar;
