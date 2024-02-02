import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../FirebaseConfig/Firebaseconfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
export const CreateUser = (formik) => {
  // const navigate = useNavigate(); gives me error of invalid hook call-- why ?
  createUserWithEmailAndPassword(
    auth,
    formik.values.email,
    formik.values.password
  )
    .then((usercredentials) => {
      console.log(usercredentials);
      toast.success("User is created");
      console.log("use created");
      formik.resetForm();
      // navigate("/SignInpage");
    })
    .catch((errors) => {
      console.log(errors);
    });
};

export const authenticate = (formik) => {
  signInWithEmailAndPassword(auth, formik.values)
    .then((usercredentials) => {
      toast.success("Successfully Logged in");
    })
    .catch((errors) => {
      toast.error("oppes error occurs !");
    });
};
