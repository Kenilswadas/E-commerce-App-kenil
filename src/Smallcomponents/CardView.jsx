import { Link } from "react-router-dom";
//BRANDS TO BAG
const BrandsToBag = ({ image1, image2, image3, image4 }) => {
  return (
    <div className="bg-[#ebf1f1] text-[#96002e] w-3/4 m-1 p-2 rounded-xl hover:shadow-xl hover:translate-y-2">
      <p className="flex">
        <img
          src={image1}
          alt=""
          className="w-1/2 h-fit border-b-4 border-[#96002e]"
        />
        <img
          src={image2}
          alt=""
          className="w-1/2 h-fit border-b-4 border-[#96002e]"
        />
      </p>
      <p className="flex">
        <img
          src={image3}
          alt=""
          className="w-1/2 h-fit border-b-4 border-[#96002e]"
        />
        <img
          src={image4}
          alt=""
          className="w-1/2 h-fit border-b-4 border-[#96002e]"
        />
      </p>
      <p className="ml-4">
        <Link className="underline">{"Explore More"}</Link>
      </p>
    </div>
  );
};
//TREANDING IN FASHION
const TrendingInFashion = ({ image, name }) => {
  return (
    <div className=" w-5/6 m-1 p-1 bg-[#96002e]  mb-8 hover:shadow-xl hover:-translate-y-2">
      <p className="flex w-fit flex items-center justify-center">
        <img src={image} alt="" className="w-full " />
      </p>
      <p className="flex flex-col items-center bg-[#ebf1f1] border-0 border-[#ebf1f1] mt-0 h-20 justify-center ">
        {name}
        <Link className="underline text-[#96002e]">{"Explore More"}</Link>
      </p>
      <p className="ml-1 text-[#ebf1f1]"></p>
    </div>
  );
};
const TrendingInGrocery = ({ logourl, image }) => {
  return (
    <div className=" flex flex-col bg-[#96002e] w-3/4 h-3/4  m-2 p-1 rounded-xl hover:translate-y-2">
      <div className="flex items-center justify-center mb-px">
        <img
          src={logourl}
          alt=""
          className=" w-10 absolute rounded-xl border-0"
        />
      </div>
      <div className="w-fit">
        <img src={image} alt="" className="h-3/4 rounded-xl border-0" />
      </div>
      <p className="ml-4 text-[#ebf1f1]">
        <Link className="underline">{"Explore More"}</Link>
      </p>
    </div>
  );
};
export { BrandsToBag, TrendingInFashion, TrendingInGrocery };
