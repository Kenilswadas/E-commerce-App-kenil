import React from "react";
import SignupImage from "../images/signupcopy.jpeg";
import {
  ConfirmPasswordfield,
  Emailfield,
  Namefield,
  Passwordfield,
} from "../Smallcomponents/Fields";
import {
  SignInButton,
  SignInWithGoogle,
  Submitbutton,
} from "../Smallcomponents/Buttons";
import Horizontalrule from "../Smallcomponents/Horizontalrule";
import { BgImage } from "../Smallcomponents/BackgroundImage";
import { Formvalidation } from "./Formvalidation";

//firebase imports
function SignUppage() {
  const formik = Formvalidation();
  return (
    <div className="flex items-center justify-center  bg-white h-screen">
      <BgImage />
      <div className="bg-[#D9D9D9] h-5/6 w-3/5 flex relative">
        <div className="w-3/6 flex">
          <img src={SignupImage} alt="" />
        </div>
        <div className="w-3/5  flex items-center justify-center">
          <div className=" h-4/3 w-4/5 text-center flex flex-col items-center">
            <h1 className="text-3xl font-bold text-[#3C3633]">Sign Up</h1>
            <form action="" onSubmit={formik.handleSubmit}>
              <Namefield formik={formik} />
              <Emailfield formik={formik} />
              <Passwordfield formik={formik} />
              <ConfirmPasswordfield formik={formik} />
              <Submitbutton />
            </form>
            <Horizontalrule />
            <SignInWithGoogle />
            <div>
              <SignInButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUppage;
