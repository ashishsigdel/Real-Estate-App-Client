import React from "react";
import { FaSearch } from "react-icons/fa";

export default function HeaderSearch() {
  return (
    <div className="px-3 py-2 rounded-md flex items-center text-darkcolor/80 gap-2 border border-lightcolor dark:border-darkcolor">
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent focus:outline-none placeholder:text-darkcolor/50 dark:placeholder:text-lightcolor text-darkcolor dark:text-lightcolor"
      />
      <div className="text-skin">
        <FaSearch />
      </div>
    </div>
  );
}
