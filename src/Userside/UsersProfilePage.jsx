import React, { useState, useEffect } from "react";
import NavBar from "../Smallcomponents/NavBar";

import { auth, db } from "../FirebaseConfig/Firebaseconfig";
import { collection, onSnapshot } from "firebase/firestore";
import UserProfileEditForm from "../Smallcomponents/UserProfileEditForm";
import { ToastContainer } from "react-toastify";
import UserProfileNavbar from "../Smallcomponents/UserProfileNavbar";
import { useParams } from "react-router-dom";
import ProfilePage from "../Smallcomponents/ProfilePage";
import SavedAddresspage from "../Smallcomponents/SavedAddresspage";
import { useNavigate } from "react-router-dom";
import MyOrders from "../Smallcomponents/MyOrders"
function UsersProfilePage({
  userName,
  setIsLoading,
  isLoading,
  setSearchInput,
  searchInput,
}) {
  const [ShowEditProfiePage, setShowEditProfiePage] = useState(false);
  const [userProfiles, setUserProfiles] = useState([]);
  const [currentUserId, setcurrentUserId] = useState(null);
  const { pages } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth?.currentUser?.email === "admin@gmail.com") {
      navigate("/Admin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, auth?.currentUser]);
  useEffect(() => {
    onSnapshot(collection(db, "userDetails"), (snap) => {
      const alldata = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      alldata
        .filter((data) => data.UserName === auth?.currentUser?.displayName)
        .map((e) => {
          return setcurrentUserId(e.id);
        });
    });
  }, []);
  useEffect(() => {
    onSnapshot(collection(db, "userDetails"), (snap) => {
      const alldata = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserProfiles(alldata);
    });
  }, []);
  return (
    <div>
      <NavBar
        btn1name={"Home"}
        page1={"/"}
        btn2name={"Men"}
        page2={"/Fashion/Men"}
        btn3name={"Women"}
        page3={"/Fashion/Women"}
        btn4name={"Kids"}
        page4={"/Fashion/Kids"}
        btn5name={"Beauty"}
        page5={"/Fashion/Beauty"}
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        userName={userName}
      />

      {ShowEditProfiePage ? (
        <UserProfileEditForm
          setShowEditProfiePage={setShowEditProfiePage}
          currentUserId={currentUserId}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          userProfiles={userProfiles}
        />
      ) : null}
      <ToastContainer />
      <div className="flex flex-col mt-10  m-10 p-2 ml-40 mr-40">
        <div className="flex bg-[#ebf1f1] w-full p-4 border-b-2 border-[#96200e]">
          <span className="text-xs">
            <img
              src={userProfiles
                .filter((data) => data.UserName === userName)
                .map((e) => e.Image)}
              alt="user"
              className="rounded-full h-10 w-10"
            />
          </span>
          <span className=" ml-8 flex flex-col">
            <p className="font-bold text-xl">
              {" "}
              {userProfiles
                .filter((data) => data.UserName === userName)
                .map((e) => e.UserName)}
            </p>
            <span>
              <span className="text-xs">
                {userProfiles
                  .filter((data) => data.UserName === userName)
                  .map((e) => e.Email)}
              </span>
            </span>
          </span>
        </div>
        <div className="h-screen flex mt-2">
          <UserProfileNavbar
            setShowEditProfiePage={setShowEditProfiePage}
            userProfiles={userProfiles}
          />
          {pages === "Profiledetail" ? (
            <ProfilePage
              setShowEditProfiePage={setShowEditProfiePage}
              userProfiles={userProfiles}
            />
          ) : null}
          {pages === "SavedAddresspage" ? (
            <SavedAddresspage
              setShowEditProfiePage={setShowEditProfiePage}
              userProfiles={userProfiles}
              // seteditAddress={seteditAddress}
              // editAddress={editAddress}
            />
          ) : null}
          {pages === "MyOrders" ? (
            <MyOrders
              setShowEditProfiePage={setShowEditProfiePage}
              userProfiles={userProfiles}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default UsersProfilePage;
