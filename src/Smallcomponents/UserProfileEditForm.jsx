import React, { useEffect, useState } from "react";
import { Label } from "../Smallcomponents/Label";
import { InputField } from "../Smallcomponents/InputField";
import { Button } from "../Smallcomponents/Buttons";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { updateDoc, doc, onSnapshot, collection } from "firebase/firestore";
import { db, storage } from "../FirebaseConfig/Firebaseconfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Loader from "./Loader";
function UserProfileEditForm({ setShowEditProfiePage }) {
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  // const formik = useFormik({
  //   initialValues: {
  //     UserName: "",
  //     Email: "",
  //     Mobile: "",
  //     //   Gender: "",
  //     DateofBirth: "",
  //     Image: "",
  //     //   Address: "",
  //   },
  //   validationSchema: Yup.object({
  //     UserName: Yup.string()
  //       .max(15, "Must be 15 characters or less")
  //       .required("required"),
  //     Email: Yup.string().email("invalid email").required("required"),
  //     Mobile: Yup.string()
  //       .min(10, "Must Enter 10 Digit")
  //       .max(10, "Must Enter 10 Digit")

  //       .required("required"),
  //     //   Gender: Yup.string().required("required"),
  //     DateofBirth: Yup.string().required("required"),
  //     Image: Yup.string().required("required"),
  //     //   Address: Yup.string().required("required"),
  //   }),
  //   onSubmit: (values) => {
  //     alert("ok");
  //     console.log(values);
  //     handleAddData();
  //   },
  // });
  // useEffect(()=>{
  //   onSnapshot(collection(db,"userDetails"),(snap)=>{
  //     const data = snap.docs.map((doc)=>({
  //       id:doc.id,
  //       ...doc.data()
  //     }));
  //     setUserdata(data)
  //   })
  // },[])
  async function handleUpdateData(v) {
    toast.info("getting url");
    
    const imageRef = ref(storage, `userDetails_Images/${image.name}`);
    await uploadBytes(imageRef, image).then((res) => {
      console.log("uploadBytes");
    });
    const url = await getDownloadURL(imageRef).then((url) => {
      // setImageUrl(url);
      console.log(url);
      return url;
    });
    toast.info("updating data...");
    console.log(url);
    updateDoc(doc(db, "userDetails", "fhOj16yO2c1Kbi5kWuJV"), {
      Address: "",
      DateofBirth: v.DateofBirth,
      Email: v.Email,
      Gender: "",
      Image: url,
      Mobile: v.Mobile,
      UserName: v.UserName,
      Password: "",
      user_UID: "",
    });
    await setShowEditProfiePage(false);
  }
  return (
    <div className="fixed inset-0 bg-cover bg-center bg-opacity-50 bg-black flex  flex-col items-center justify-center z-50 h-screen ">
      <p className="text-white m-2">UserProfileEditForm</p>
      <Formik
        initialValues={{
          UserName: "",
          Email: "",
          Mobile: "",
          Gender: "",
          DateofBirth: "",
          Image: null,
          //   Address: "",
        }}
        validationSchema={Yup.object({
          UserName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("required"),
          Email: Yup.string().email("invalid email").required("required"),
          Mobile: Yup.string()
            .min(10, "Must Enter 10 Digit")
            .max(10, "Must Enter 10 Digit")
            .required("required"),
          Gender: Yup.string().required("required"),
          DateofBirth: Yup.string().required("required"),
          // Image: Yup.string().required("required"),
          //   Address: Yup.string().required("required"),
        })}
        onSubmit={(values) => {
          alert("ok");
          console.log(values);
          // handleFileUpload(values);
          handleUpdateData(values);
        }}
      >
        {(formik) => (
          <form
            action=""
            className=" flex flex-col  bg-gray-200 w-4/6 rounded-xl h-fit p-4"
          >
            <div className="flex">
              <div className="flex flex-col w-3/6">
                <Label name={"UserName"} />
                <Field name="UserName" type="text" />
                <ErrorMessage name="UserName" />
                <Label name={"Email"} />
                <Field name="Email" type="text" />
                <ErrorMessage name="Email" />
                <Label name={"Mobile"} />
                <Field name="Mobile" type="number" />
                <ErrorMessage name="Mobile" />
                <Label name={"Gender"} />
                <Field as="select" name="Gender">
                  <option value="">Please select your Gender</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                </Field>
                <ErrorMessage name="Gender" />
                <Label name={"DateofBirth"} />
                <Field name="DateofBirth" type="date" />
                <ErrorMessage name="DateofBirth" />
              </div>
              <div className="flex flex-col ml-4">
                <Label name={"Image of User"} />
                {/* <Field name="Image" id="Image" type="file" /> */}
                <input
                  type="file"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />
                {console.log(image)}
                {/* <ErrorMessage name="Image" /> */}
                {console.log()}
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
        )}
      </Formik>
    </div>
  );
}

export default UserProfileEditForm;
