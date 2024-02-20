import React, { useEffect } from "react";
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
import { toast } from "react-toastify";
import { CiCircleRemove } from "react-icons/ci";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#217aa9",
    color: theme.palette.common.white,
    textAlign: "center",
    alignItems: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    textAlign: "center",
    alignItems: "center",
    padding: 2,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
    alignItems: "center",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
    alignItems: "center",
  },
}));

function Cartpage({ totalItems, userName }) {
  const navigate = useNavigate();
  const { items, removeItem, updateItemQuantity } = useCart();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

  return (
    <div className="">
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
            buttonName={"LogOut"}
            clickHandler={handleLogout}
            FaIons={<HiOutlineLogout />}
          />
          <NavButton
            page={"/Home/Fashion/Men/Cartpage"}
            buttonName={"Cart"}
            FaIons={<FaCartShopping className="mr-1" />}
            totalItems={totalItems}
          />
        </ul>
      </nav>
      <div className="flex flex-col items-center justify-center mt-10">
        <p className="text-3xl p-2 text-[#217aa9] ">My Orders</p>
        <div className="p-0 text-black">
          <TableContainer sx={{ minWidth: 1400, maxHeight: 400 }}>
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
                        {row.price}
                      </StyledTableCell>
                      <StyledTableCell
                        key={`quantity-${row.id}`}
                        className="flex items-center"
                      >
                        <button
                          onClick={() =>
                            updateItemQuantity(row.id, row.quantity - 1)
                          }
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
                        <button onClick={() => removeItem(row.id)}>
                          <CiCircleRemove size={20} />
                        </button>
                      </StyledTableCell>
                      <StyledTableCell key={`place-order-${row.id}`}>
                        <button className="bg-red-200 rounded-full p-1">
                          {"Place Order"}
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
      </div>
      {totalItems}
    </div>
  );
}

export default Cartpage;
