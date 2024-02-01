import React from "react";
const Namefield = ({ formik }) => {
  return (
    <div>
      <input
        id="name"
        type="text"
        {...formik.getFieldProps("name")}
        placeholder="Name"
        className="bg-white text-[#3C3454] rounded-full mt-5 pl-4 p-0.5 w-64 border-2 border-[#D9D9D]"
      />
      {formik.touched.name && formik.errors.name ? (
        <p className="text-red-800">{formik.errors.name}</p>
      ) : null}
    </div>
  );
};
const Emailfield = ({ formik }) => {
  console.log(formik);
  return (
    <div>
      <input
        id="eamil"
        type="text"
        {...formik.getFieldProps("email")}
        placeholder="Email"
        className="bg-white text-[#3C3454] rounded-full mt-5 pl-4 p-0.5 w-64 border-2 border-[#D9D9D]"
      />
      {formik.touched.email && formik.errors.email ? (
        <div className="text-red-800">{formik.errors.email}</div>
      ) : null}
    </div>
  );
};
const Passwordfield = ({ formik }) => {
  return (
    <div>
      <input
        id="password"
        type="password"
        placeholder="Password"
        {...formik.getFieldProps("password")}
        className="bg-white text-[#3C3454] rounded-full mt-5 pl-4 p-0.5 w-64 border-2 border-[#D9D9D]"
      />
      {formik.touched.password && formik.errors.password ? (
        <div className="text-red-800">{formik.errors.password}</div>
      ) : null}
    </div>
  );
};
const ConfirmPasswordfield = ({ formik }) => {
  return (
    <div>
      <input
        id="ConfirmPassword"
        type="password"
        {...formik.getFieldProps("ConfirmPassword")}
        placeholder="Confirm Password"
        className="bg-white text-[#3C3454] rounded-full mt-5 pl-4 p-0.5 w-64 border-2 border-[#D9D9D]"
      />
      {formik.touched.ConfirmPassword && formik.errors.ConfirmPassword ? (
        <div className="text-red-800">{formik.errors.ConfirmPassword}</div>
      ) : null}
    </div>
  );
};

export { Emailfield, Namefield, Passwordfield, ConfirmPasswordfield };
