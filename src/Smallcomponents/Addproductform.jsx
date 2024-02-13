import React from "react";
import { Label } from "../Smallcomponents/Label";
import { InputField } from "../Smallcomponents/InputField";
import { Button } from "../Smallcomponents/Buttons";
import { useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "@firebase/firestore";
//firebase storage
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
//firebase database
import { db, storage } from "../FirebaseConfig/Firebaseconfig";
//uuidv4
import { v4 as uuid } from "uuid";

function Addproductform({ setDisplayform, isupdate, DocId }) {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const AddProducts = async () => {
    const uId = uuid();
    const mycollection = collection(db, "MyProducts");
    const imageRef = ref(storage, `${image.name}`);
    await uploadBytes(imageRef, image);
    const url = await getDownloadURL(imageRef);
    addDoc(mycollection, {
      ProductName: name,
      ProductDetails: details,
      ProductPrice: price,
      Category: category,
      ProductId: uId,
      ProductImage: url,
    });
  };
  console.log(isupdate);
  // Conditionally update the document if isupdate is true
  if (isupdate) {
    updateDoc(doc(db, "MyProducts", DocId), {
      ProductName: "Tv",
    });
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 absolute z-50 bg-opacity-50 ">
      <div className="bg-gray-200 p-10">
        <form action="" className="flex   flex-col w-96 p-4 bg-[#D9D9D9] ">
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
          <select
            className=" text-[#747264] mb-4 rounded-full pl-4"
            name=""
            id=""
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Fashion">Select category</option>
            <option value="Fashion">Fashion</option>
            <option value="Grocery">Grocery</option>
          </select>
          <Label name={"Product Image"} />
          <InputField type={"file"} placeholder={""} setFunction={setImage} />
          <div className="flex justify-around">
            {isupdate ? (
              <Button btnName={"Update"} clickHandler={""} />
            ) : (
              <Button
                btnName={"Add Product"}
                clickHandler={() => {
                  AddProducts();
                }}
              />
            )}
            <Button
              btnName={"Cancel"}
              clickHandler={() => {
                setDisplayform(false);
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addproductform;
