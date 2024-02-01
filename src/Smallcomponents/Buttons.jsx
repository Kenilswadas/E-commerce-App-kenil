import React from "react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
const Submitbutton = () => {
  return (
    <div>
      <button type="submit" className="bg-[#E0CCBE] text-[#3C3633] rounded-full mt-8 p-1 w-28 ">
        Submit button
      </button>
    </div>
  );
};
const SignInWithGoogle = () => {
  return (
    <div>
      <button className=" flex items-center justify-center bg-[#E0CCBE] text-[#3C3454] rounded-full mt-1 p-0.5 w-60 ">
        <FaGoogle />
        &nbsp;&nbsp;{"Sign In With Google"}
      </button>
    </div>
  );
};
const SignInButton = () => {
  return (
    <div className="flex">
      <p className="text-[#3C3633]">
        {"Already have an account ? "}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button className="bg-[#E0CCBE] text-[#3C3633] rounded-full mt-5 p-px w-20 ">
          <Link to={"/SignInpage"}>{"Sign In"}</Link>
        </button>
      </p>
    </div>
  );
};

export { Submitbutton, SignInWithGoogle, SignInButton };
