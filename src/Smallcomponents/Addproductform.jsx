import React from "react";
import { Label } from "../Smallcomponents/Label";
import { InputField } from "../Smallcomponents/InputField";
import { Button } from "../Smallcomponents/Buttons";
import { useState } from "react";
import { addDoc, collection, doc, getDocs } from "@firebase/firestore";
//firebase storage
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
//firebase database
import { db, storage } from "../FirebaseConfig/Firebaseconfig";
//uuidv4
import { v4 as uuid } from "uuid";
function Addproductform() {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const AddProducts = async () => {
    alert("ki");
    const uId = uuid();
    const mycollection = collection(db, "MyProducts");
    //use firestorage
    const imageRef = ref(storage, `${image.name}`);
    // console.log(imageRef);
    await uploadBytes(imageRef, image);
    const url = await getDownloadURL(imageRef);
    console.log(url);
    addDoc(mycollection, {
      ProductName: name,
      ProductDetails: details,
      ProductPrice: price,
      ProductId: uId,
      ProductImage: url,
    });
  };

  return (
    <div className="bg-red-200">
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
        <Button
          btnName={"Add Product"}
          clickHandler={() => {
            AddProducts();
          }}
        />
      </form>
    </div>
  );
}

export default Addproductform;
