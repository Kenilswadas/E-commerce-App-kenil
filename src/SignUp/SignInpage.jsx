import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Inputfield } from "../Smallcomponents/Fields";
import { Button } from "../Smallcomponents/Buttons";
import Horizontalrule from "../Smallcomponents/Horizontalrule";
import { BgImage } from "../Smallcomponents/BackgroundImage";
import { ForgotPassword } from "../Smallcomponents/ForgotPassword";
import { ToastContainer } from "react-toastify";
import { FaGoogle } from "react-icons/fa";
import signIncopy from "../images/signIncopy.jpeg";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../FirebaseConfig/Firebaseconfig";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
function SignInpage() {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("invalid email").required("required"),
      password: Yup.string()
        .min(8, "must be 8 character long")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
          "must conatains upper case ,lower case , one special character and one digit"
        )
        .required("required"),
    }),
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  function handleSubmit() {
    signInWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then((userCredential) => {
        toast("successfully signged in");
        navigate("/Home");
      })
      .catch((errors) => {
        toast.error(errors.message);
        console.log(errors);
        setError(errors);
      });
  }
  useEffect(() => {
    // if (localStorage.getItem("usrEmail") === null) {
    //   navigate("/SignInpage");
    // }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        navigate("/Home");
      }
    });
  });
  return (
    <div className="flex items-center justify-center  bg-white h-screen">
      <ToastContainer />
      <BgImage />
      <div className="bg-[#D9D9D9] h-5/6 w-3/5 flex relative">
        <div className="w-3/5  flex items-center justify-center">
          <div className=" h-3/5 w-4/5 text-center flex flex-col items-center">
            <h1 className="text-3xl font-bold text-[#3C3633]">Sign In</h1>
            <form>
              <Inputfield
                fieldName={"email"}
                fieldtype={"email"}
                formik={formik}
              />
              <Inputfield
                fieldName={"password"}
                fieldtype={"password"}
                formik={formik}
              />
              <Button
                btnName={"Sign in"}
                formik={formik}
                clickHandler={formik.handleSubmit}
              />
              {error ? <div>{error.message}</div> : null}
            </form>
            <Horizontalrule />
            <Button
              faicon={<FaGoogle className="mr-2" />}
              btnName={"Sign In With Google"}
            />
            <ForgotPassword />
            <p>
              {"New to this Site : "}
              <Link className="underline text-blue-900" to={"/"}>
                {"Sign Up"}
              </Link>
            </p>
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
