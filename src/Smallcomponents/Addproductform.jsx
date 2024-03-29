import React, { useEffect } from "react";
import { Label } from "../Smallcomponents/Label";
import { InputField } from "../Smallcomponents/InputField";
import { Button } from "../Smallcomponents/Buttons";
import { useState } from "react";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "@firebase/firestore";
//firebase storage
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
//firebase database
import { db, storage } from "../FirebaseConfig/Firebaseconfig";
//uuidv4
import { v4 as uuid } from "uuid";
import Loader from "./Loader";
import { toast } from "react-toastify";

function Addproductform({
  // displayform,
  setDisplayform,
  isupdate,
  DocId,
  setisupdate,
  setIsLoading,
  isLoading,
}) {
  const [MyProduct, setMyProduct] = useState(null);
  useEffect(() => {
    onSnapshot(collection(db, "MyProducts"), (snap) => {
      const data = snap.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      data
        .filter((data) => data.docId === DocId)
        .map((e) => {
          return setMyProduct(e);
        });
    });
  }, []);

  const [name, setName] = useState("");
  const [description, setDiscription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [basecategory, setBaseCategory] = useState("");
  const [image, setImage] = useState(null);
  const mycollection = collection(db, "MyProducts");
  const uId = uuid();
  // if (MyProduct?.ProductName) {
  //   setName(MyProduct?.ProductName);
  //   setDiscription(MyProduct?.ProductDescription);
  //   setPrice(MyProduct?.ProductPrice);
  //   setCategory(MyProduct?.Category);
  //   setSubCategory(MyProduct?.SubCategory);
  //   setBaseCategory(MyProduct?.BaseCategory);
  // } else {
  //   setName("");
  //   setDiscription("");
  //   setPrice("");
  //   setCategory("");
  //   setSubCategory("");
  //   setBaseCategory("");
  // }
  console.log(MyProduct);
  const AddProducts = async () => {
    const imageRef = ref(storage, `hi.jpeg`);
    await uploadBytes(imageRef, image);
    const url = await getDownloadURL(imageRef);
    console.log(url);
    setIsLoading(true);
    addDoc(mycollection, {
      ProductName: name,
      ProductDescription: description,
      ProductPrice: price,
      DiscountedPrice: price - price * 0.4,
      Category: category,
      SubCategory: subcategory,
      BaseCategory: basecategory,
      ProductId: uId,
      ProductImage: url,
    })
      .then((e) => {
        toast.success("Product added successfully");
      })
      .catch((error) => {
        toast.error("opps ! error occurs ...");
      })
      .finally((e) => {
        setIsLoading(false);
        setDisplayform(false);
      });
  };
  async function update() {
    console.log(image);
    const imageRef = ref(storage, `${image.name}`);
    console.log(imageRef);
    await uploadBytes(imageRef, image);
    const url = await getDownloadURL(imageRef);
    console.log(url);
    setIsLoading(true);

    updateDoc(doc(db, "MyProducts", DocId), {
      ProductName: MyProduct?.ProductName ? MyProduct?.ProductName : name,
      ProductDescription: MyProduct?.ProductDescription
        ? MyProduct?.ProductDescription
        : description,
      ProductPrice: MyProduct?.ProductPrice ? MyProduct?.ProductPrice : price,
      DiscountedPrice: MyProduct?.DiscountedPrice
        ? MyProduct?.DiscountedPrice
        : price - price * 0.4,
      Category: MyProduct?.Category ? MyProduct?.Category : category,
      SubCategory: MyProduct?.SubCategory
        ? MyProduct?.SubCategory
        : subcategory,
      BaseCategory: MyProduct?.BaseCategory
        ? MyProduct?.BaseCategory
        : basecategory,
      ProductId: MyProduct?.ProductId ? MyProduct?.ProductId : uId,
      ProductImage: MyProduct?.ProductImage ? MyProduct?.ProductImage : url,
    })
      .then((e) => {
        toast.success("updated successfully !");
      })
      .catch((e) => {
        toast.error("opps ! error occurs");
      })
      .finally((e) => {
        setIsLoading(false);
        setDisplayform(false);
        setisupdate(false);
      });
  }
  console.log();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      {isLoading ? <Loader /> : null}
      <div className=" p-10">
        <form action="" className=" w-full p-4 bg-[#ebf1f1] ">
          <div className="flex justify-center">
            <div className="flex flex-col w-1/2 m-2">
              <Label name={"Product Name"} />
              <InputField
                type={"text"}
                placeholder={"Product Name"}
                value={name}
                setFunction={setName}
              />
              <Label name={"Product Description"} />
              <InputField
                type={"text"}
                placeholder={"Product Details"}
                setFunction={setDiscription}
              />
              <Label name={"Product Price"} />
              <InputField
                type={"number"}
                placeholder={"Product Price"}
                setFunction={setPrice}
              />{" "}
              <Label name={"After Discount Price : "} />
              <div className="bg-white rounded-xl pl-4">
                {price - price * 0.4}
              </div>
            </div>
            <div className="flex flex-col w-1/2 m-2">
              <Label name={"Select Category"} />
              <select
                className=" text-[#747264] mb-4 rounded-full pl-4"
                name=""
                id=""
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select category</option>
                <option value="Grocery">Grocery</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Mobiles">Mobiles</option>
              </select>{" "}
              {category ? (
                <>
                  <Label name={"Sub Category"} />
                  <select
                    className=" text-[#747264] mb-4 rounded-full pl-4"
                    name=""
                    id=""
                    disabled={category === ""}
                    onChange={(e) => setSubCategory(e.target.value)}
                  >
                    <option value="">Sub category</option>
                    {category === "Grocery" && (
                      <>
                        <option key="Dairy Product">Dairy Product</option>
                        <option key="Vegetables">Vegetables</option>
                        <option key="Fruits">Fruits</option>
                        <option key="Snacks & Beverages">
                          Snacks & Beverages
                        </option>
                        <option key="Packaged Food">Packaged Food</option>
                        <option key="Staples">Staples</option>
                      </>
                    )}
                    {category === "Fashion" && (
                      <>
                        <option key="Men's Top Wear">Men's Top Wear</option>
                        <option key="Women's Top Wear">Women's Top Wear</option>
                        <option key="Men's Bottom Wear">
                          Men's Bottom Wear
                        </option>
                        <option key="Women's Bottom Wear">
                          Women's Bottom Wear
                        </option>
                        <option key="Men's Foot Wear">Men's Foot Wear</option>
                        <option key="Women's Foot Wear">
                          Women's Foot Wear
                        </option>
                        <option key="Men's Festive Wear">
                          Men's Festive Wear
                        </option>
                        <option key="Women's Festive Wear">
                          Women's Festive Wear
                        </option>
                        <option key="Boy's Clothing">Boy's Clothing</option>
                        <option key="Girl's Clothing">Girl's Clothing</option>
                        <option key="Child Footwear">Child Footwear</option>
                        <option key="Beauty Product">Beauty Product</option>
                      </>
                    )}
                    {category === "Electronics" && (
                      <>
                        <option key="Cameras & Accessories">
                          Cameras & Accessories
                        </option>
                        <option key="Laptop & Accessories">
                          Laptop & Accessories
                        </option>
                        <option key="Computer Phripherals">
                          Computer Phripherals
                        </option>
                        <option key="Smart Wearables">Smart Wearables</option>
                      </>
                    )}
                    {category === "Mobiles" && (
                      <>
                        <option key="Apple">Apple</option>
                        <option key="Samsung">Samsung</option>
                        <option key="Redmi">Redmi</option>
                        <option key="OnePlus">OnePlus</option>
                      </>
                    )}
                  </select>
                </>
              ) : null}
              {/* Based on Brands -- base category */}
              {subcategory ? (
                <>
                  <Label name={"Base Category"} />
                  <select
                    className=" text-[#747264] mb-4 rounded-full pl-4"
                    name="Brands"
                    id=""
                    onChange={(e) => setBaseCategory(e.target.value)}
                  >
                    <option value="">base category</option>
                    {/* men section */}
                    {subcategory === "Men's Top Wear" && (
                      <>
                        <option value="Roadster">Roadster</option>
                        <option value="U.S. Polo Assn.">U.S. Polo Assn.</option>
                      </>
                    )}
                    {subcategory === "Men's Bottom Wear" && (
                      <>
                        <option value="Roadster">Roadster</option>
                        <option value="U.S. Polo Assn.">U.S. Polo Assn.</option>
                      </>
                    )}{" "}
                    {subcategory === "Men's Foot Wear" && (
                      <>
                        <option value="Sparx">Sparx</option>
                        <option value="ADIDAS">ADIDAS</option>
                      </>
                    )}
                    {subcategory === "Men's Festive Wear" && (
                      <>
                        <option value="SOJANYA">SOJANYA</option>
                        <option value="DEVOILER">DEVOILER</option>
                      </>
                    )}
                    {/* Women section */}
                    {subcategory === "Women's Top Wear" && (
                      <>
                        <option value="Dress Berry">Dress Berry</option>
                        <option value="FOREVER 21">FOREVER 21</option>
                      </>
                    )}
                    {subcategory === "Women's Bottom Wear" && (
                      <>
                        <option value="Roadster">Roadster</option>
                        <option value="DressBerry">DressBerry</option>
                      </>
                    )}{" "}
                    {subcategory === "Women's Foot Wear" && (
                      <>
                        <option value="Puma">Puma</option>
                        <option value="DressBerry">DressBerry</option>
                      </>
                    )}
                    {subcategory === "Women's Festive Wear" && (
                      <>
                        <option value="KALINI">KALINI</option>
                        <option value="Shae by SASSAFRAS">
                          Shae by SASSAFRAS
                        </option>
                      </>
                    )}
                    {subcategory === "Beauty Product" && (
                      <>
                        <option value="Lakme">Lakme</option>
                        <option value="Nivea">Nivea</option>
                      </>
                    )}
                  </select>
                </>
              ) : null}
              <Label name={"Product Image"} />
              <InputField
                type={"file"}
                placeholder={""}
                setFunction={setImage}
              />
            </div>
          </div>
          <div className="flex justify-around">
            {isupdate ? (
              <Button btnName={"Update"} clickHandler={update} />
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
