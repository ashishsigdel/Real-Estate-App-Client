import React from "react";
import { BsSend } from "react-icons/bs";

export default function MesssageInput() {
  return (
    <form className="flex items-center gap-2 mt-3 p-2">
      <div className="px-3 py-2 rounded-md flex items-center text-darkcolor/80 gap-2 border border-lightcolor dark:border-darkcolor w-full">
        <input
          type="text"
          placeholder="Type Message..."
          className="bg-transparent focus:outline-none placeholder:text-darkcolor/50 dark:placeholder:text-gray-500 text-darkcolor dark:text-gray-300 w-full"
        />
        <button type="submit">
          <div className="text-skin">
            <BsSend />
          </div>
        </button>
      </div>
    </form>
  );
}
