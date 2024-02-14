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
    <div className="flex">
      <div>
        <VerticalNavbar userName={userName} />
      </div>
      <div className="bg-[#ebf1f1] flex flex-col items-center justify-center h-screen w-full">
        <Button
          btnName="Add Product"
          clickHandler={() => {
            addProducts();
          }}
        />
        <div className="m-10">
          <CustomizedTables
            setDisplayform={setDisplayform}
            displayform={displayform}
            isupdate={isupdate}
            setisupdate={setisupdate}
            setDocId={setDocId}
          />
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
    </div>
  );
}

export default Dashboard;
