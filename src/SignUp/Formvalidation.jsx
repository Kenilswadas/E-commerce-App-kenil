import { useFormik } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FirebaseConfig/Firebaseconfig";
function Formvalidation() {
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
      alert(JSON.stringify(value, null, 2));
      createUserWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then((usercredential) => {
          console.log(usercredential);
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
  });
  return formik;
}

export { Formvalidation };
