import { Link } from "react-router-dom";
//BRANDS TO BAG
const BrandsToBag = ({ image1, image2, image3, image4 }) => {
  return (
    <div className="bg-[#ebf1f1] w-fit m-1 p-2 rounded-xl">
      <p className="flex">
        <img
          src={image1}
          alt=""
          className="w-1/2 h-fit border-8 border-[#ebf1f1]"
        />
        <img
          src={image2}
          alt=""
          className="w-1/2 h-fit border-8 border-[#ebf1f1]"
        />
      </p>
      <p className="flex">
        <img
          src={image3}
          alt=""
          className="w-1/2 h-fit border-8 border-[#ebf1f1]"
        />
        <img
          src={image4}
          alt=""
          className="w-1/2 h-fit border-8 border-[#ebf1f1]"
        />
      </p>
      <p className="ml-4">
        <Link className="underline">{"Explore More"}</Link>
      </p>
    </div>
  );
};
//TREANDING IN FASHION
const TrendingInFashion = ({ image }) => {
  return (
    <div className="bg-[#ebf1f1] w-fit m-1 p-2 rounded-xl mb-8">
      <p className="flex w-fit flex items-center justify-center">
        <img src={image} alt="" className="w-full border-8 border-[#ebf1f1]" />
      </p>
      <p className="flex bg-white border-8 border-[#ebf1f1] mt-0 h-20 justify-center rounded-xl">
        HELLO
      </p>
      <p className="ml-4">
        <Link className="underline">{"Explore More"}</Link>
      </p>
    </div>
  );
};
const TrendingInGrocery = ({ logo, image }) => {
  return (
    <div className="bg-[#ebf1f1] w-fit  m-1 p-8 rounded-xl">
      <div className="flex items-center justify-center mb-px">
        <img src={logo} alt="" className=" w-16 absolute rounded-xl border-0" />
      </div>
      <div className="flex w-54 h-auto flex items-center justify-center">
        <img src={image} alt="" className="w-56 rounded-xl border-0" />
      </div>
      <p className="ml-4">
        <Link className="underline">{"Explore More"}</Link>
      </p>
    </div>
  );
};
export { BrandsToBag, TrendingInFashion, TrendingInGrocery };
