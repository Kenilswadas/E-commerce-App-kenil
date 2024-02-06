import React from "react";
import { IoIosSearch } from "react-icons/io";

const Search = () => {
  return (
    <li className="flex bg-white items-center   rounded-full">
      <input
        type="text"
        className="rounded-full p-1 pl-4 border-none focus:outline-none"
        placeholder="Search"
      />
      <IoIosSearch size={24} className="mr-4" />
    </li>
  );
};

export { Search };