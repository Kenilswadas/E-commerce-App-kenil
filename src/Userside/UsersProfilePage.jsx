import React, { useEffect, useState } from "react";
import NavBar from "../Smallcomponents/NavBar";
import { NavLink } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig/Firebaseconfig";
import UserProfileEditForm from "../Smallcomponents/UserProfileEditForm";

function UsersProfilePage({ userName }) {
  const [userProfiles, setUserProfiles] = useState([]);
  const [ShowEditProfiePage,setShowEditProfiePage]=useState(false);
  useEffect(() => {
    onSnapshot(collection(db, "userDetails"), (snap) => {
      const alldata = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserProfiles(alldata);
    });
  }, []);

  //handleClick 
  function handleClick(){
    setShowEditProfiePage(true);

  }
  return (
    <div>
      <NavBar
        btn1name={"Home"}
        btn2name={"Men"}
        btn3name={"Women"}
        btn4name={"Kids"}
        btn5name={"Beauty"}
        userName={userName}
      />
      {ShowEditProfiePage ? <UserProfileEditForm setShowEditProfiePage={setShowEditProfiePage}/> : null}
      <div className="flex flex-col mt-10  m-10 p-2 ml-40 mr-40">
        <h1 className="flex flex-col bg-[#ebf1f1] w-full p-4 border-b-2 border-[#96200e]">
          {"Account"}
          <span className="text-xs">
            {userProfiles
              .filter((data) => data.UserName === userName)
              .map((e) => e.UserName)}
          </span>
        </h1>
        <div className="h-screen flex mt-2">
          <nav className="w-1/5 h-full flex flex-col text-center bg-[#ebf1f1]  mr-2">
            <div className="border-b-2  border-gray-300">
              <ul className="w-full">
                <li className="flex flex-col  w-full p-2">
                  <NavLink className="p-2 mt-4 w-full bg-[#ebf1f1] text-[#96200e] hover:bg-[#ffffff] hover:text-[#96200e]">
                    OverView
                  </NavLink>
                  <NavLink className="p-2 mt-4 w-full bg-[#ebf1f1] text-[#96200e] hover:bg-[#ffffff] hover:text-[#96200e]">
                    My Orders
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="border-b-2  border-gray-300">
              <ul className="w-full">
                <li className="flex flex-col w-full p-2">
                  <NavLink className="p-2 mt-4 w-full bg-[#ebf1f1] text-[#96200e] hover:bg-[#ffffff] hover:text-[#96200e]">
                    Profile detail
                  </NavLink>
                  <NavLink className="p-2 mt-4 w-full bg-[#ebf1f1] text-[#96200e] hover:bg-[#ffffff] hover:text-[#96200e]">
                    Saved Addresses
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="flex items-end h-full">
              <ul className="w-full">
                <li className="flex flex-col w-full p-2">
                  <NavLink className=" flex items-center justify-center p-2 mt-4 w-full bg-[#96200e] text-[#ffffff] hover:bg-[#ffffff] hover:text-[#96200e]">
                    {"Log Out"} <HiOutlineLogout />
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
          <div className="w-4/5 bg-[#ebf1f1] h-full border-l-2 border-[#96200e]">
            <div className="m-4 flex flex-col">
              <h1 className="text-2xl">{"Profile Details :-"}</h1>
              <div className="m-16 w-3/4 ">
                <p className="flex justify-around">
                  <span className="flex p-1 w-full text-center">
                    {"Full Name"}{" "}
                  </span>
                  <span className="flex p-1 w-full text-center">
                    {userProfiles
                      .filter(
                        (data) => data.UserName === auth.currentUser.displayName
                      )
                      .map((e) => e.UserName)}
                  </span>
                </p>
                <p className="flex justify-around mt-2">
                  <span className="flex p-1 w-full text-center">
                    {"Mobile Number"}{" "}
                  </span>
                  <span className="flex p-1 w-full text-center">
                    {userProfiles
                      .filter(
                        (data) => data.UserName === auth.currentUser.displayName
                      )
                      .map((e) => (e.Mobile === "" ? "--add--" : e.Mobile))}
                  </span>
                </p>
                <p className="flex justify-around mt-2">
                  <span className="flex p-1 w-full text-center">
                    {"Email ID"}{" "}
                  </span>
                  <span className="flex p-1 w-full text-center">
                    {userProfiles
                      .filter(
                        (data) => data.UserName === auth.currentUser.displayName
                      )
                      .map((e) => (e.Email === "" ? "--add--" : e.Email))}
                  </span>
                </p>
                <p className="flex justify-around mt-2">
                  <span className="flex p-1 w-full text-center">
                    {"Gender"}{" "}
                  </span>
                  <span className="flex p-1 w-full text-center">
                    {userProfiles
                      .filter(
                        (data) => data.UserName === auth.currentUser.displayName
                      )
                      .map((e) => (e.Gender === "" ? "--add--" : e.Gender))}
                  </span>
                </p>
                <p className="flex justify-around mt-2">
                  <span className="flex p-1 w-full text-center">
                    {"Date Of Birth"}{" "}
                  </span>
                  <span className="flex p-1 w-full text-center">
                    {userProfiles
                      .filter(
                        (data) => data.UserName === auth.currentUser.displayName
                      )
                      .map((e) =>
                        e.DateofBirth === "" ? "--add--" : e.DateofBirth
                      )}
                  </span>
                </p>
                <p className="flex justify-around mt-2">
                  <span className="flex p-1 w-full text-center">
                    {"Image Of User"}{" "}
                  </span>
                  <span className="flex p-1 w-full text-center">
                    {userProfiles
                      .filter(
                        (data) => data.UserName === auth.currentUser.displayName
                      )
                      .map((e) => (e.Image === "" ? "--add--" : e.Image))}
                  </span>
                </p>
                <p className="flex justify-around mt-2">
                  <span className="flex p-1 w-full text-center">
                    {"Address"}{" "}
                  </span>
                  <span className="flex p-1 w-full text-center">
                    {userProfiles
                      .filter(
                        (data) => data.UserName === auth.currentUser.displayName
                      )
                      .map((e) => (e.Address === "" ? "--add--" : e.Address))}
                  </span>
                </p>
                <div className="flex items-center justify-start mt-10">
                  <button className="w-3/4 p-2 bg-[#217aa9] text-white" onClick={()=>{handleClick()}}>
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersProfilePage;
