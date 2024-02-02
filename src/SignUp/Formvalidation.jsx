import { useFormik } from "formik";
import * as Yup from "yup";
import { CreateUser, authenticate } from "../Firebasemethods/AllMethods";
import { toast } from "react-toastify";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../FirebaseConfig/Firebaseconfig"
import { useNavigate } from "react-router-dom";
function Formvalidation() {
  // console.log(isusercreated);
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
    onSubmit: (value) => {
      console.log(value);
      toast.success(JSON.stringify(value, null, 2));
      // alert(JSON.stringify(value, null, 2));
      navigate("/SignInpage");
       CreateUser(formik);
      //  authenticate(formik);
      
      // formik.resetForm();
    },
  });
  return formik;
}

export { Formvalidation };
