import React, { useEffect, useState } from "react";
import logo from "../images/logo2.png";
import { NavButton } from "../Smallcomponents/NavButton";
import { Search } from "../Smallcomponents/Searchbar";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useCart } from "react-use-cart";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";
import { signOut } from "firebase/auth";
import { auth } from "../FirebaseConfig/Firebaseconfig";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { CiCircleRemove } from "react-icons/ci";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import DisplayProduct from "../Smallcomponents/DisplayProduct";
import { Link } from "react-router-dom";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#217aa9",
    color: theme.palette.common.white,
    textAlign: "center",
    alignItems: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    backgroundColor: "#ebf1f1",
    textAlign: "center",
    alignItems: "center",
    padding: 2,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    alignItems: "center",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
    alignItems: "center",
  },
}));

function Cartpage({ totalItems, userName, showProduct, setShowProduct }) {
  const navigate = useNavigate();
  const { items, removeItem, updateItemQuantity, cartTotal } = useCart();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [productId, setProductId] = useState(false);

  //handleCheckout function
  function handleCheckout() {
    Swal.fire({
      title: "You are not Logged In",
      text: "Please log in first",
      confirmButtonText: "Login",
      confirmButtonColor: "green",
      showCancelButton: "true",
      cancelButtonText: "Cancel",
      cancelButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/SignInPage");
      } else {
        Swal.close();
      }
    });
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        navigate("/");
        toast("Sign-out successful.");
      })
      .catch((error) => {
        toast.error("Oops! An error occurred.");
      });
  };
  //handleDelete
  function handleDelete(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeItem(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  }
  //handleDecrement
  function handleDecrement(item) {
    item.quantity !== 1
      ? updateItemQuantity(item.id, item.quantity - 1)
      : Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, remove it!",
        }).then((result) => {
          if (result.isConfirmed) {
            removeItem(item.id);
            Swal.fire({
              title: "Removed!",
              text: "Your file has been removed.",
              icon: "success",
            });
          }
        });
  }
  const ViewProducts = (row) => {
    setShowProduct(true);
    setProductId(row.id);
  };

  return (
    <div className="">
      <ToastContainer />
      {showProduct && (
        <DisplayProduct
          items={items}
          productId={productId}
          setShowProduct={setShowProduct}
        />
      )}
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
          {auth.currentUser ? (
            <NavButton
              page={"/Admin"}
              buttonName={
                userName ? userName : localStorage.getItem("userName")
              }
              FaIons={<FaUserCircle className="mr-1" />}
            />
          ) : (
            <Link
              className="text-[#96200e] flex items-center"
              to={"/SignInPage"}
            >
              <FaUserCircle className="mr-1" />
              Login
            </Link>
          )}
          <NavButton
            buttonName={"LogOut"}
            clickHandler={handleLogout}
            FaIons={<HiOutlineLogout />}
          />
          <NavButton
            page={"/Home/Fashion/Men/Cartpage"}
            buttonName={"Cart"}
            FaIons={<FaCartShopping className="" />}
            totalItems={totalItems}
          />
        </ul>
      </nav>
      <p className="text-3xl p-2 text-[#217aa9] text-center ">My Orders</p>
      <div className="flex items-top justify-center h-full  p-4">
        <div className="p-0 text-black shadow-2xl">
          <TableContainer sx={{ minWidth: 1000 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>ProductImage</StyledTableCell>
                  <StyledTableCell>ProductName</StyledTableCell>
                  <StyledTableCell>ProductPrice</StyledTableCell>
                  <StyledTableCell>ProductQuantity</StyledTableCell>
                  <StyledTableCell>Remove</StyledTableCell>
                  <StyledTableCell>Place Order</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {items
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, rowIndex) => (
                    <StyledTableRow key={rowIndex} hover role="checkbox">
                      <StyledTableCell key={`image-${row.id}`}>
                        <img
                          src={row.ProductImage}
                          alt=""
                          className="w-20 m-auto"
                        />
                      </StyledTableCell>
                      <StyledTableCell key={`name-${row.id}`}>
                        {row.ProductName}
                      </StyledTableCell>
                      <StyledTableCell key={`price-${row.id}`}>
                        {row.price * row.quantity}
                      </StyledTableCell>
                      <StyledTableCell
                        key={`quantity-${row.id}`}
                        className="flex items-center"
                      >
                        <button
                          onClick={() => {
                            handleDecrement(row);
                          }}
                        >
                          <span className=" flex bg-gray-200 p-2 pb-2">
                            <FaMinus />
                          </span>
                        </button>
                        <button>
                          <span className=" flex m-2 p-2 bg-gray-200 font-bold">
                            {row.quantity}
                          </span>
                        </button>
                        <button
                          onClick={() =>
                            updateItemQuantity(row.id, row.quantity + 1)
                          }
                        >
                          <span className=" flex bg-gray-200 p-2">
                            <FaPlus />
                          </span>
                        </button>
                      </StyledTableCell>
                      <StyledTableCell key={`remove-${row.id}`}>
                        <button
                          onClick={() => {
                            handleDelete(row.id);
                          }}
                        >
                          <CiCircleRemove size={20} />
                        </button>
                      </StyledTableCell>
                      <StyledTableCell key={`place-order-${row.id}`}>
                        <button
                          className="bg-[#ffffff] border-2 border-[#96200e] text-[#96200e] rounded-full p-1 hover:-translate-y-2"
                          onClick={() => {
                            ViewProducts(row);
                          }}
                        >
                          View Product
                        </button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 100]}
            component="div"
            count={items.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
        <div className="bg-[#ebf1f1] ml-3 shadow-2xl p-4 flex flex-col  w-full">
          <h1 className="text-center text-xl font-bold text-[#ebf1f1] bg-[#217aa9] p-2 m-0">
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
            <span>{`Total Amount`}</span>
            <span className="text-xl">
              {"Rs. "}
              {Math.round(
                cartTotal + (0 - cartTotal * 0.2) + (0 - cartTotal * 0.018)
              )}
            </span>
          </p>
          <div className="mt-4 grid ">
            {/* <Link
              to={"/Home/Fashion/Men/Cartpage/Checkout/Payment"}
              className="grid"
            > */}
            <button
              className="bg-green-500 rounded-xl text-center text-[#ffffff] p-2"
              onClick={() => {
                handleCheckout();
              }}
            >
              Check Out
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cartpage;
