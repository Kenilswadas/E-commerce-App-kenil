import { useFormik } from "formik";
const InputField = ({
  id,
  type,
  placeholder,
  setFunction,
  value,
  name,
  onBlur,
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onBlur={onBlur}
      className="mb-4 rounded-full pl-4"
      onChange={
        type === "file"
          ? (e) => setFunction(e.target.files[0])
          : (e) => setFunction(e.target.value)
      }
      // onChange={
      //   setFunction === "formik.handleChange"
      //     ? setFunction
      //     : type === "file"
      //     ? (e) => setFunction(e.target.files[0])
      //     : (e) => {
      //         setFunction(e.target.value);
      //       }
      // }
      // onChange={(e) => setFunction(e.target.value)}
    />
  );
};
export { InputField };
