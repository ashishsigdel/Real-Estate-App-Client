import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";

export default function HeaderAccount() {
  return (
    <div className="relative group cursor-pointer">
      <div
        className="flex items-center text-success transition-all duration-300 ease-in-out mr-8"
        title="Account"
      >
        <div className="relative flex text-2xl leading-[17px] text-success dark:text-lightcolor">
          <FaUser />
        </div>
        <div className="flex flex-col uppercase ml-2.5">
          <span className="transition-all duration-300 ease-in-out text-xs leading-none text-success dark:text-lightcolor mb-1.5 tracking-wider capitalize font-medium">
            Account
          </span>
          <span className="transition-all duration-300 ease-in-out text-sm font-medium text-success dark:text-lightcolor leading-[14px] max-[1199px]:text-xs max-[1199px]:min-w-[48px]">
            Login
          </span>
        </div>
      </div>
      <ul className="absolute left-0 mt-6 py-1 w-36 bg-white dark:bg-dark border border-lightcolor dark:border-success rounded-md opacity-0 invisible transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:mt-7 z-10">
        <li>
          <Link
            href="/register"
            className="block py-2 px-5 text-sm font-normal text-success dark:text-lightcolor hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Register
          </Link>
        </li>
        <li>
          <Link
            href="/login"
            className="block py-2 px-5 text-sm font-normal text-success dark:text-lightcolor hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
}
