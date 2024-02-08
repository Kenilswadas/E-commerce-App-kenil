import React, { useState } from "react";
import { storage, db } from "../FirebaseConfig/Firebaseconfig";
import { VerticalNavbar } from "../Smallcomponents/VerticalNavbar";
import { getStorage, ref, uploadBytes } from "firebase/storage";
const Admin = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [productId, setProductId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload image to Firebase Storage
    const storageRef = storage.ref();
    const imageRef = storageRef.child(image.name);
    await imageRef.put(image);
    const imageUrl = await imageRef.getDownloadURL();

    // Add product data to Firestore
    await db.collection("products").add({
      name,
      description,
      imageUrl,
      price,
      discountPrice,
      productId,
    });

    // Clear form fields after submission
    setName("");
    setDescription("");
    setImage(null);
    setPrice("");
    setDiscountPrice("");
    setProductId("");
  };

  return (
    <div className="flex">
      <div>
        <VerticalNavbar />
      </div>
      <div className="flex items-center justify-center h-screen w-full">
        <h1 className="text-green-500 text-5xl ">Welcome to Admin page</h1>
      </div>
    </div>
  );
};

export default Admin;
