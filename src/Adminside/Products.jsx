import React, { useEffect, useState } from "react";
import { VerticalNavbar } from "../Smallcomponents/VerticalNavbar";
import { Label } from "../Smallcomponents/Label";
import { InputField } from "../Smallcomponents/InputField";
import { Button } from "../Smallcomponents/Buttons";
//uuidv4
import { v4 as uuid } from "uuid";
//id generator
// import nextId from "react-id-generator";
//firebase database
import { db, storage } from "../FirebaseConfig/Firebaseconfig";
import { addDoc, getDocs, collection, doc, getDoc } from "@firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { Link } from "react-router-dom";
function Products() {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imageurl, setImageurl] = useState(null);
  const [items, setItems] = useState([]);
  const [display, setDisplay] = useState(false);

  const AddProducts = async () => {
    const uId = uuid();
    // const NId = nextId();
    console.log(name);
    console.log(details);
    console.log(price);
    console.log(image);
    console.log(uId);
    console.log(imageurl);
    const mycollection = collection(db, "MyProducts");
    console.log(mycollection);
    //use firestorage
    const imageRef = ref(storage, image);

    await uploadBytes(imageRef, image);
    const url = await getDownloadURL(imageRef);
    console.log(url);
    setImageurl(url);

    addDoc(mycollection, {
      ProductName: name,
      ProductDetail: details,
      ProductPrice: price,
      ProductId: uId,
      ProductImage: imageurl,
    });
  };
  const getItems = async () => {
    let arr = [];
    const mycollection = collection(db, "MyProducts");
    const querySnapshot = await getDocs(mycollection);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      arr.push(data);
    });
    setItems(arr);
  };
  const displayForm = () => {
    if (!display) {
      setDisplay(true);
    } else setDisplay(false);
  };
  return (
    <div className="flex">
      <div>
        <VerticalNavbar />
      </div>
      <div className="flex items-center justify-center h-screen w-full flex-col">
        {/* <button className="bg-red-200 rounded-full p-2  from-slate-200	duration-300  ">
          Add Product
        </button> */}
        <div className="flex w-96  item-center justify-between">
          <Link
            to={""}
            onClick={displayForm}
            class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
          >
            <span class="w-48 h-48 rounded rotate-[-40deg] bg-blue-400 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span class="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
              Add Products
            </span>
          </Link>
          <Link
            to={""}
            onClick={getItems}
            class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
          >
            <span class="w-48 h-48 rounded rotate-[-40deg] bg-green-400 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span class="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
              Get Items
            </span>
          </Link>
        </div>
        {display ? (
          <form action="" className="flex flex-col p-4 bg-[#D9D9D9]  ">
            <Label name={"Product Name"} />
            <InputField
              type={"text"}
              placeholder={"Product Name"}
              setFunction={setName}
            />
            <Label name={"Product Details"} />
            <InputField
              type={"text"}
              placeholder={"Product Details"}
              setFunction={setDetails}
            />
            <Label name={"Product Price"} />
            <InputField
              type={"number"}
              placeholder={"Product Price"}
              setFunction={setPrice}
            />
            <Label name={"Product Image"} />
            <InputField type={"file"} placeholder={""} setFunction={setImage} />

            <Button btnName={"Add Product"} clickHandler={AddProducts} />
          </form>
        ) : null}
        <div className="bg-red-200 h-48 w-48">
          {items.map((item, index) => (
            <div key={index}>
              <p>Name: {item.ProductName}</p>
              <p>Details: {item.ProductDetail}</p>
              <p>Price: {item.ProductPrice}</p>
              <p>ID: {item.ProductId}</p>
              <p>Image: {item.ProductImage}</p>
              {console.log(item.ProductImage)}
              <img src={item.ProductImage} alt="Product" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
