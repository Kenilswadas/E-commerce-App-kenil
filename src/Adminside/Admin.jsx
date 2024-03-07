import React, { useEffect } from "react";
import { VerticalNavbar } from "../Smallcomponents/VerticalNavbar";
import { auth } from "../FirebaseConfig/Firebaseconfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Admin = ({ userName }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(auth?.currentUser?.email);
    if (auth?.currentUser?.email === "admin@gmail.com") {
      // alert("admin");
    } else {
      navigate("/");
    }
  }, [navigate, auth?.currentUser]);
  return (
    <div className="flex h-screen">
      <VerticalNavbar
        userName={userName ? userName : localStorage.getItem("userName")}
      />
      <div className="bg-[#ebf1f1] flex items-center justify-center w-full">
        <h1 className="text-4xl text-[#217aa9]">
          Welcome {userName ? userName : localStorage.getItem("userName")}
        </h1>
      </div>
    </div>
  );
};

export default Admin;
