import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import { IoIosCloseCircle } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { useCart } from "react-use-cart";
import { useNavigate } from "react-router-dom";
function PaymentForm({ setDisplayPaymentForm ,FinalPrice}) {
  const { emptyCart } = useCart();
  const navigate = useNavigate();
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (evt) => {
    let { name, value } = evt.target;
    // Check if the input field is for the expiry date and if its length is greater than 4
    if (name === "expiry" && value.length > 4) {
      // If the length is greater than 4, return to prevent updating the state
      return;
    }
    if (name === "number" && value.length > 16) {
      return;
    }
    if (name === "cvc" && value.length > 3) {
      return;
    }

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };
  async function handlePayment(event) {
    event.preventDefault();
    // console.log(typeof state.name);
    // console.log(state.cvc);
    // console.log(state.expiry);
    // console.log(typeof state.number);
    // console.log(state.name);
    if (!(state.name || state.number || state.cvc || state.expiry)) {
      toast.error("Please fill up the values");
    } else {
      setDisplayPaymentForm(false);
      Swal.fire({
        titleText: `Thank You For Payment of ${FinalPrice}`,
        text: "Have A Good Day.",
        icon: "success",
      }).then(() => {
        emptyCart();
        navigate("/Home");
      });
      
    }
  }
  return (
    <div className="flex items-center justify-center  bg-opacity-70 z-50">
      <ToastContainer />
      <form
        action=""
        className=" p-4 bg-[#ebf1f1] rounded-2xl w-3/5 flex flex-col items-center justify-center "
      >
        <div className="flex justify-end w-full text-gray-500 hover:text-[#217aa9]">
          <IoIosCloseCircle
            className="flex-end"
            size={30}
            onClick={() => {
              setDisplayPaymentForm(false);
            }}
          />
        </div>
        <div className="w-full">
          <Cards
            number={state.number}
            expiry={state.expiry}
            cvc={state.cvc}
            name={state.name}
            focused={state.focus}
          />
        </div>
        <div className="grid w-3/5  m-2">
          <label
            htmlFor="Card Holder Name"
            className="font-bold text-[#217aa9]"
          >
            {"Card Holder Name"}
          </label>
          <input
            type="text"
            name="name"
            placeholder="Card Holder Name"
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="mb-2 rounded-full"
          />
          <label htmlFor="Card Number" className="font-bold text-[#217aa9]">
            {"Card Number"}
          </label>
          <input
            type="number"
            name="number"
            placeholder="Card Number"
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="mb-2 rounded-full"
          />
          <label htmlFor="Expiry Date" className="font-bold text-[#217aa9]">
            {"Expiry Date"}
          </label>
          <input
            type="number"
            name="expiry"
            pattern="\d{3,4}"
            value={state.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="rounded-full"
          />
          <label htmlFor="Cvc" className="font-bold text-[#217aa9] mt-2">
            {"Cvc"}
          </label>
          <input
            type="number"
            name="cvc"
            // pattern="\d{3,4}"
            value={state.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="rounded-full"
          />
          <button
            className="bg-[#ebf1f1] text-[#217aa9] border-2 border-[#217aa9] mt-5 p-2 rounded-full hover:bg-green-400]"
            onClick={handlePayment}
          >
            Make Payment
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaymentForm;
