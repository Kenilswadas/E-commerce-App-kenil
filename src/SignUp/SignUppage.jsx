import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import SignupImage from "../images/signupcopy.jpeg";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Inputfield } from "../Smallcomponents/Fields";
import { Button } from "../Smallcomponents/Buttons";
import Horizontalrule from "../Smallcomponents/Horizontalrule";
import { BgImage } from "../Smallcomponents/BackgroundImage";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../FirebaseConfig/Firebaseconfig";

function SignUppage() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      ConfirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("required"),
      email: Yup.string().email("invalid email").required("required"),
      password: Yup.string()
        .min(8, "must be 8 character long")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
          "must conatains upper case ,lower case , one special character and one digit"
        )
        .required("required"),
      ConfirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password must match")
        .required("required"),
    }),
    onSubmit: (values) => {
      toast.success(JSON.stringify(values, null, 2));
      navigate("/SignInpage");

      console.log(auth);
      createUserWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then((userCredential) => {
          toast.success("user is created");
          localStorage.setItem("usrEmail", userCredential.user.email);
        })
        .catch((error) => {
          toast.error("oppes error !!");
          console.log(error);
        });
    },
  });
  console.log(auth);
  return (
    <div className="flex items-center justify-center  bg-white h-screen">
      {/* <ToastContainer /> */}
      <BgImage />
      <div className="bg-[#D9D9D9] h-5/6 w-3/5 flex relative">
        <div className="w-3/6 flex">
          <img src={SignupImage} alt="" />
        </div>
        <div className="w-3/5  flex items-center justify-center">
          <div className=" h-4/3 w-4/5 text-center flex flex-col items-center">
            <h1 className="text-3xl font-bold text-[#3C3633]">Sign Up</h1>
            <form>
              <Inputfield
                fieldName={"name"}
                fieldtype={"text"}
                formik={formik}
              />
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
              <Inputfield
                fieldName={"ConfirmPassword"}
                fieldtype={"password"}
                formik={formik}
              />
              <Button
                btnName={"Submit button"}
                formik={formik}
                clickHandler={formik.handleSubmit}
              />
            </form>
            <Horizontalrule />
            <Button
              btnName={"Sign In With Google"}
              faicon={<FaGoogle className="mr-2" />}
            />
            <div className="mt-2">
              <p>
                {"Already have an account ? "}
                <span>
                  <Link
                    to={"/SignInpage"}
                    className="underline underline-offset-1"
                  >
                    {"Sign In"}
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUppage;
