import React from "react";
import SignupImage from "../images/signupcopy.jpeg";
const BgImage = ({image}) => {
  return (
    <div
      className="absolute inset-0 bg-cover bg-center blur-xl"
      style={{ backgroundImage: `url(${SignupImage})` }}
    ></div>
  );
};
export { BgImage };
