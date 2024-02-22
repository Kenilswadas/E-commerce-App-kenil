import React, { useState } from "react";
import { NavButton } from "../Smallcomponents/NavButton";
import logo from "../images/logo2.png";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from "react-use-cart";
import { Search } from "../Smallcomponents/Searchbar";
import Cards from "react-credit-cards-2";
import { Label } from "../Smallcomponents/Label";
import { InputField } from "../Smallcomponents/InputField";
function Payment({ userName }) {
  const { totalItems } = useCart();
  const [name, setName] = useState("");
  const [description, setDiscription] = useState("");
  const [price, setPrice] = useState("");
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };
  return (
    <div>
      <nav className="bg-[#ebf1f1] p-px sticky top-0 shadow-2xl z-50">
        <ul className="flex flex-wrap items-center justify-around">
          <li className="flex">
            <img src={logo} alt="" className=" w-auto h-20 p-2" />
          </li>
          <li className="flex items-center w-full sm:w-2/4 ml-8">
            <NavButton buttonName={"Home"} page={"/Home"} />
            <NavButton buttonName={"Men"} />
            <NavButton buttonName={"Women"} />
            <NavButton buttonName={"Kids"} />
            <NavButton buttonName={"Beauty"} />
          </li>
          <Search />
          <NavButton
            page={"/Admin"}
            buttonName={userName ? userName : localStorage.getItem("userName")}
            FaIons={<FaUserCircle className="mr-1" />}
          />
          <NavButton
            page={"/Home/Fashion/Men/Cartpage"}
            buttonName={"Cart"}
            FaIons={<FaCartShopping className="" />}
            totalItems={totalItems}
          />
        </ul>
      </nav>
      <form action="" className=" w-full p-4 bg-[#ebf1f1] ">
        <div className="flex justify-center">
          <div className="flex flex-col w-1/2 m-2">
            <Cards
              number={state.number}
              expiry={state.expiry}
              cvc={state.cvc}
              name={state.name}
              focused={state.focus}
            />
            <Label name={"Name on card"} />
            <input
              type="text"
              name="name"
              placeholder="Card Number"
              value={state.name}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <Label name={"Card number"} />
            <input
              type="number"
              name="number"
              placeholder="Card Number"
              value={state.number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <Label name={"Expiration date"} />
            <input
              type="date"
              value={state.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Payment;
