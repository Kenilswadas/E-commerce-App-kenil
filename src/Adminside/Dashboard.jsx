import React from "react";
//table from material ui
import CustomizedTables from "../Smallcomponents/Table";
import { VerticalNavbar } from "../Smallcomponents/VerticalNavbar";
import { Button } from "../Smallcomponents/Buttons";
import Addproductform from "../Smallcomponents/Addproductform";
import { useState } from "react";

function Dashboard({ userName }) {
  const [displayform, setDisplayform] = useState(false);
  const [isupdate, setisupdate] = useState(false);
  const [DocId, setDocId] = useState(null);
  //addProducts function
  const addProducts = () => {
    if (displayform) {
      setDisplayform(false);
    } else setDisplayform(true);
  };
  return (
    <div>
      <VerticalNavbar userName={userName} />
      <div className="flex flex-col items-center justify-center">
        <div className="flex mt-10">
          <Button
            btnName="Add Product"
            clickHandler={() => {
              addProducts();
            }}
          />
        </div>

        <div className="flex items-center justify-center mt-10 ml-10">
          <div className="w-3/4">
            <CustomizedTables
              setDisplayform={setDisplayform}
              displayform={displayform}
              isupdate={isupdate}
              setisupdate={setisupdate}
              setDocId={setDocId}
            />
          </div>
        </div>
      </div>
      {displayform ? (
        <Addproductform
          setDisplayform={setDisplayform}
          isupdate={isupdate}
          setisupdate={setisupdate}
          DocId={DocId}
        />
      ) : null}
    </div>
  );
}

export default Dashboard;
