import React, { useEffect, useState } from "react";
import { NavButton } from "../Smallcomponents/NavButton";
import logo from "../images/logo2.png";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from "react-use-cart";
import { Search } from "../Smallcomponents/Searchbar";
import "react-credit-cards-2/dist/es/styles-compiled.css";
// import { Link } from "react-router-dom";
import PaymentForm from "../Smallcomponents/PaymentForm";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { auth } from "../FirebaseConfig/Firebaseconfig";
function Payment({ userName }) {
  const navigate = useNavigate();
  const { totalItems, cartTotal, emptyCart } = useCart();
  const [FinalPrice, setFinalPrice] = useState(0);
  const [DisplayPaymentForm, setDisplayPaymentForm] = useState(false);
  useEffect(() => {
    if (auth?.currentUser?.email === "admin@gmail.com") {
      navigate("/Admin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, auth?.currentUser]);
  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/SignInPage");
    }
  }, [navigate]);
  useEffect(() => {
    setFinalPrice(
      Math.round(cartTotal + (0 - cartTotal * 0.2) + (0 - cartTotal * 0.018))
    );
  }, [cartTotal, totalItems]);
  function handleCashPayment() {
    setDisplayPaymentForm(false);
    Swal.fire({
      title: "Please , Enter the Amount",
      text: `Amout That You have To Pay is ${FinalPrice}`,
      input: "number",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Pay`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.isConfirmed && result.value === `${FinalPrice}`) {
          Swal.fire({
            titleText: `Thank You For Payment of ${FinalPrice}`,
            text: "Have A Good Day.",
            icon: "success",
          }).then(() => {
            emptyCart();
            navigate("/Home");
          });
        } else {
          Swal.fire({
            text: "Entered Amount is not match with Final Price ",
          });
        }
      } else if (result.isDenied) {
        Swal.close();
      }
    });
  }
  function handleCardPayment() {
    setDisplayPaymentForm(true);
  }
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

      <div className="flex">
        <div className=" h-screen w-3/4 bg-[#ffffff] ">
          <div className="flex  justify-center mt-10 mb-2 h-fit gap-6">
            <button
              className="relative "
              onClick={() => {
                handleCashPayment();
              }}
            >
              <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-cyan-200"></span>
              <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-10 py-2 text-base font-bold text-[#96200e] transition duration-100  hover:bg-[#ebf1f1] border-2 dark:bg-transparent">
                {"Cash On Delivery"}
              </span>
            </button>
            <button
              className="relative"
              onClick={() => {
                handleCardPayment();
              }}
            >
              <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-cyan-200	"></span>
              <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-10 py-2 text-base font-bold text-[#96200e] transition duration-100  hover:bg-[#ebf1f1] border-2 dark:bg-transparent">
                {" Credit Card"}
              </span>
            </button>
          </div>
          <div>
            {DisplayPaymentForm ? (
              <PaymentForm
                setDisplayPaymentForm={setDisplayPaymentForm}
                FinalPrice={FinalPrice}
              />
            ) : null}
          </div>
        </div>
        <div className="bg-[#ebf1f1] ml-3 shadow-2xl  p-4 flex flex-col flex-end w-96">
          <h1 className="text-center text-xl font-bold text-[#ebf1f1] bg-[#217aa9] p-2 ">
            {"Order summary"}
          </h1>
          <div className="p-2 mt-5 ]">
            <p className="flex justify-between">
              <span>{`Items (${totalItems} items)`}</span>
              <span>
                {"Rs. "}
                {cartTotal}
              </span>
            </p>
            <p className="flex justify-between mt-2">
              <span>{`Discount`}</span>
              <span className="text-green-500">
                {"Rs. "}
                {0 - cartTotal * 0.2}
              </span>
            </p>
            <p className="flex justify-between mt-2">
              <span>{`Tax estimate`}</span>
              <span className="text-green-500">
                {"Rs. "}
                {Math.round(0 - cartTotal * 0.018)}
              </span>
            </p>
            <p className="flex justify-between mt-2">
              <span>{`Delivery Charges`}</span>
              <span>
                <strike>
                  <span>{"Rs. "}</span>
                </strike>
                <span className="text-green-500">{"Free"}</span>
              </span>
            </p>
          </div>
          <hr />
          <p className="flex justify-between mt-2">
            <span className="text-xl font-bold">{`Final Price -- `}</span>
            <span className="text-xl">
              {"Rs. "}
              {FinalPrice}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Payment;
