import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  deleteDoc,
  onSnapshot,
} from "@firebase/firestore";
import { db } from "../FirebaseConfig/Firebaseconfig";
import { Button } from "../Smallcomponents/Buttons";
import { MdDelete } from "react-icons/md";
import { MdUpdate } from "react-icons/md";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "",
    color: theme.palette.common.white,
    textalign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 11,
    textalign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: "rgb(75, 85, 99,0.2)",
  },
}));

export default function CustomizedTables() {
  const [items, setItems] = useState([]);
  const [Products, setproducts] = useState([]);
  const getItems = async () => {
    let arr = [];
    const mycollection = collection(db, "MyProducts");
    const querySnapshot = await getDocs(mycollection);
    // querySnapshot.map((doc) => {
    //   const data = doc.data();
    //   arr.push(data);
    //   console.log(data);
    // });
    // setItems(arr);
    const alldata = onSnapshot(mycollection, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setproducts(data);
    });
    return alldata;
  };
  useEffect(() => {
    getItems();
  }, []);

  //handleDelete
  const handleDelete = async (id) => {
    console.log(id);
    await deleteDoc(doc(db, "MyProducts", id));
  };
  return (
    <div className="flex">
      <TableContainer component={Paper} className="p-10 bg-red-200">
        <Table
          sx={{ minWidth: 900 }}
          aria-label="customized table"
          className="w-full"
        >
          <TableHead className="bg-gray-600">
            <TableRow>
              <StyledTableCell align="center">Product Image</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Details</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">id</StyledTableCell>
              <StyledTableCell align="center" colSpan={2}>
                update
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Products.map((data) => (
              <StyledTableRow key={data.id}>
                <StyledTableCell
                  scope="row"
                  className="flex justify-center items-center w-24"
                >
                  <img src={data.ProductImage} className="m-auto" alt="" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  {data.ProductName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {data.ProductDetails}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {data.ProductPrice}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {data.ProductId}
                </StyledTableCell>{" "}
                <StyledTableCell align="center">
                  <Button
                    btnName={"delete"}
                    faicon={<MdDelete size={20} color="#4b5563" />}
                    clickHandler={() => handleDelete(data.id)}
                  />
                </StyledTableCell>{" "}
                <StyledTableCell align="center">
                  <Button btnName={"update"} faicon={<MdUpdate size={20} />} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
