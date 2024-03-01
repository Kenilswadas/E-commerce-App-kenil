import React from "react";
import { Label } from "../Smallcomponents/Label";
import { InputField } from "../Smallcomponents/InputField";
import { Button } from "../Smallcomponents/Buttons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { addDoc, collection, updateDoc,doc } from "firebase/firestore";
import { db } from "../FirebaseConfig/Firebaseconfig";
function UserProfileEditForm({ setShowEditProfiePage }) {
  const formik = useFormik({
    initialValues: {
      UserName: "",
      Email: "",
      Mobile: "",
      //   Gender: "",
      DateofBirth: "",
      Image: "",
      //   Address: "",
    },
    validationSchema: Yup.object({
      UserName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("required"),
      Email: Yup.string().email("invalid email").required("required"),
      Mobile: Yup.string()
        .min(10, "Must Enter 10 Digit")
        .max(10, "Must Enter 10 Digit")

        .required("required"),
      //   Gender: Yup.string().required("required"),
      DateofBirth: Yup.string().required("required"),
      Image: Yup.string().required("required"),
      //   Address: Yup.string().required("required"),
    }),
    onSubmit: (values) => {
      alert("ok");
      console.log(values);
      handleAddData();
    },
  });
  function handleAddData() {
    toast.info("adding data...");
    updateDoc((doc(db, "userDetails","iOTzurneaTN5SskpkRsj")), {
      Address: "",
      DateofBirth: formik.values.DateofBirth,
      Email: formik.values.Email,
      Gender: "",
      Image: "",
      Mobile: formik.values.Mobile,
      UserName: formik.values.UserName,
      Password: "",
      user_UID: "",
    });
  }
  return (
    <div className="fixed inset-0 bg-cover bg-center bg-opacity-50 bg-black flex  flex-col items-center justify-center z-50 h-screen ">
      <ToastContainer />
      <p className="text-white m-2">UserProfileEditForm</p>
      <form
        action=""
        className=" flex flex-col  bg-gray-200 w-4/6 rounded-xl h-fit p-4"
      >
        <div className="flex">
          <div className="flex flex-col w-3/6">
            <Label name={"UserName"} />
            <InputField
              id={"UserName"}
              name={"UserName"}
              type={"text"}
              onBlur={formik.handleBlur}
              placeholder={"Enter UserName"}
              value={formik.values.UserName}
              setFunction={formik.handleChange}
            />
            {formik.errors.UserName && formik.touched.UserName ? (
              <div className="text-sm text-red-400">
                {formik.errors.UserName}
              </div>
            ) : null}
            <Label name={"Email"} />
            <InputField
              id={"Email"}
              name={"Email"}
              type={"text"}
              onBlur={formik.handleBlur}
              placeholder={"Email"}
              value={formik.values.Email}
              setFunction={formik.handleChange}
            />
            {formik.errors.Email && formik.touched.Email ? (
              <div className="text-sm text-red-400">{formik.errors.Email}</div>
            ) : null}
            <Label name={"Mobile"} />
            <InputField
              id={"Mobile"}
              name={"Mobile"}
              type={"Number"}
              onBlur={formik.handleBlur}
              placeholder={"Mobile"}
              value={formik.values.Mobile}
              setFunction={formik.handleChange}
            />
            {formik.errors.Mobile && formik.touched.Mobile ? (
              <div className="text-sm text-red-400">{formik.errors.Mobile}</div>
            ) : null}
            <Label name={"Gender"} />
            {/* <select className="rounded-xl p-px">
              <option value="">Please Select Gender</option>
              <option value="">Male</option>
              <option value="">Female</option>
            </select>
            {formik.errors.Gender && formik.touched.Gender ? (
              <div className="text-sm text-red-400">{formik.errors.Gender}</div>
            ) : null} */}
            <Label name={"DateofBirth"} />
            <InputField
              id={"DateofBirth"}
              name={"DateofBirth"}
              type={"Date"}
              onBlur={formik.handleBlur}
              placeholder={"DateofBirth"}
              value={formik.values.DateofBirth}
              setFunction={formik.handleChange}
            />
            {formik.errors.DateofBirth && formik.touched.DateofBirth ? (
              <div className="text-sm text-red-400">
                {formik.errors.DateofBirth}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col ml-4">
            <Label name={"Image of User"} />
            <InputField
              id={"Image"}
              name={"Image"}
              type={"file"}
              onBlur={formik.handleBlur}
              placeholder={"Image of user"}
              value={formik.values.Image}
              setFunction={formik.handleChange}
            />
            {formik.errors.Image && formik.touched.Image ? (
              <div className="text-sm text-red-400">{formik.errors.Image}</div>
            ) : null}
          </div>
        </div>
        <div className="flex justify-around">
          <Button btnName={"Submit"} clickHandler={formik.handleSubmit} />
          <Button
            btnName={"Cancel"}
            clickHandler={() => setShowEditProfiePage(false)}
          />
        </div>
      </form>
    </div>
  );
}

export default UserProfileEditForm;
