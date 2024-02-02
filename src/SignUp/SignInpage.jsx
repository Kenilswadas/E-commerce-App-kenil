import React from "react";
import { Inputfield } from "../Smallcomponents/Fields";
import { Button } from "../Smallcomponents/Buttons";
import Horizontalrule from "../Smallcomponents/Horizontalrule";
import { BgImage } from "../Smallcomponents/BackgroundImage";
import { ForgotPassword } from "../Smallcomponents/ForgotPassword";
import { ToastContainer } from "react-toastify";
import { FaGoogle } from "react-icons/fa";
import signIncopy from "../images/signIncopy.jpeg";
import SignUppage from "./SignUppage";
function SignInpage() {
  const formik = SignUppage();
  return (
    <div className="flex items-center justify-center  bg-white h-screen">
      <ToastContainer />
      <BgImage />
      <div className="bg-[#D9D9D9] h-5/6 w-3/5 flex relative">
        <div className="w-3/5  flex items-center justify-center">
          <div className=" h-3/5 w-4/5 text-center flex flex-col items-center">
            <h1 className="text-3xl font-bold text-[#3C3633]">Sign In</h1>
            <form>
              {/* <Inputfield
                fieldName={"email"}
                fieldtype={"email"}
                formik={formik}
              />
              <Inputfield
                fieldName={"password"}
                fieldtype={"password"}
                formik={formik}
              /> */}
              {/* error occurs  */}
              <Button
                btnName={"Sign In Button"}
                formik={formik}
                clickHandler={formik.handleSubmit}
              />
            </form>
            <Horizontalrule />
            <Button
              faicon={<FaGoogle className="mr-2" />}
              btnName={"Sign In With Google"}
            />
            <ForgotPassword />
          </div>
        </div>
        <div className="bg-red-200 w-3/6 flex">
          <img src={signIncopy} alt="" className="w-full" />
        </div>
      </div>
    </div>
  );
}

export default SignInpage;
