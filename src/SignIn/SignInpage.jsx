import React from "react";
import SignupImage from "../images/signIncopy.jpeg";
import { Emailfield, Passwordfield } from "../Smallcomponents/Fields";
import { SignInButton, SignInWithGoogle } from "../Smallcomponents/Buttons";
import Horizontalrule from "../Smallcomponents/Horizontalrule";
import { BgImage } from "../Smallcomponents/BackgroundImage";
import { Formvalidation } from "../SignUp/Formvalidation";
import { ForgotPassword } from "../Smallcomponents/ForgotPassword";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
function SignInpage() {
  const [isusercreated, setisusercreated] = useState(false);
  const formik = Formvalidation();

  return (
    <div className="flex items-center justify-center  bg-white h-screen">
      <ToastContainer />
      <BgImage />
      <div className="bg-[#D9D9D9] h-5/6 w-3/5 flex relative">
        <div className="w-3/5  flex items-center justify-center">
          <div className=" h-3/5 w-4/5 text-center flex flex-col items-center">
            <h1 className="text-3xl font-bold text-[#3C3633]">Sign In</h1>
            <form action="" onSubmit={formik.handleSubmit}>
              <Emailfield formik={formik}/>
              <Passwordfield formik={formik} />
              <SignInButton setisusercreated={setisusercreated} />
            </form>
            <Horizontalrule />
            <SignInWithGoogle />
            <ForgotPassword />
          </div>
        </div>
        <div className="w-3/6 flex">
          <img src={SignupImage} alt="" />
        </div>
      </div>
    </div>
  );
}

export default SignInpage;
