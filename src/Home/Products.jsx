import React, { useEffect, useState } from "react";
import { VerticalNavbar } from "../Smallcomponents/VerticalNavbar";
import { Label } from "../Smallcomponents/Label";
import { InputField } from "../Smallcomponents/InputField";
import { Button } from "../Smallcomponents/Buttons";
//uuidv4
// import { uuid } from "uuidv4";
//firebase database
import { db, storage } from "../FirebaseConfig/Firebaseconfig";
import { addDoc, collection, doc, getDoc } from "@firebase/firestore";
import { ref, uploadBytes } from "@firebase/storage";
function Products() {
  const [name, setName] = useState();
  const [details, setDetails] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  const AddProducts = () => {
    console.log(name);
    console.log(details);
    console.log(price);
    console.log(image);
    const mycollection = collection(db, "MyProducts");
    // console.log(mycollection);
    const data = addDoc(mycollection, {
      ProductName: name,
      ProductDetail: details,
      ProductPrice: price,
      // ProductId:`${uuid}`,
      ProductImage: image,
    });
  };
  // useEffect(() => {
  //   const ImageRef = ref(storage, `NewFolder/${image}`);
  //   const img = getDoc(doc(db, "MyProducts", "zEts1yeiAYGpWHV4x4Cv"));
  //   console.log(img);
  //   // uploadBytes(imageRef, img);
  // }, [image]);
  return (
    <div className="flex">
      <div>
        <VerticalNavbar />
      </div>
      <div className="flex items-center justify-center h-screen w-full">
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
      </div>
    </div>
  );
}

export default Products;
