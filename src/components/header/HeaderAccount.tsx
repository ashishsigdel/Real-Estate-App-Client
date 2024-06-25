"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
// import { useLogin } from "@/hooks";
import { FaUser, FaHeart, FaShoppingBag } from "react-icons/fa";
import { setMessage } from "@/redux/features/popupMessageSlice";
import { useRouter } from "next/navigation";
import { IRootState } from "@/redux/rootReducer";

export default function HeaderAccount() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isAuthenticated, user } = useSelector(
    (state: IRootState) => state.auth
  );
  console.log(isAuthenticated, user);

  return (
    <div className="flex items-center">
      {/* Header User Start */}
      <div className="relative group cursor-pointer mr-8">
        <div
          className="flex items-center text-gray-500 transition-all duration-300 ease-in-out"
          title="Account"
        >
          <div className="relative flex text-2xl leading-[17px] text-gray-500 dark:text-gray-400">
            <FaUser />
          </div>
          <div className="flex flex-col uppercase ml-2.5">
            <span className="transition-all duration-300 ease-in-out text-xs leading-none text-gray-500 dark:text-gray-400 mb-1.5 tracking-wider capitalize font-medium">
              Account
            </span>
            <span className="transition-all duration-300 ease-in-out text-sm font-medium text-gray-500 dark:text-gray-400 leading-[14px] max-[1199px]:text-xs max-[1199px]:min-w-[48px]">
              {isAuthenticated ? "Profile" : "Login"}
            </span>
          </div>
        </div>
        <ul className="absolute left-0 mt-6 py-1 w-36 bg-white dark:bg-dark border border-lightcolor dark:border-darkcolor rounded-md opacity-0 invisible transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:mt-7 z-10">
          {isAuthenticated ? (
            <>
              <li>
                <Link
                  href="/profile"
                  className="block py-2 px-5 text-sm font-normal text-gray-500 dark:text-lightcolor hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Profile
                </Link>
              </li>
              {/* {isLoading ? ( */}
              {/* <div className="w-full flex justify-center items-center py-2"> */}
              {/* <FaSpinner className="w-4 h-4 text-gray-500 dark:text-gray-400 animate-spin" /> */}
              {/* </div> */}
              {/* ) : ( */}
              <li>
                <div
                  className="cursor-pointer block py-2 px-5 text-sm font-normal text-gray-500 dark:text-lightcolor hover:bg-gray-100 dark:hover:bg-gray-700"
                  // onClick={handleLogoutClick}
                >
                  Logout
                </div>
              </li>
              {/* )}  */}
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/register"
                  className="block py-2 px-5 text-sm font-normal text-gray-500 dark:text-lightcolor hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="block py-2 px-5 text-sm font-normal text-gray-500 dark:text-lightcolor hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {/* Header User End */}
    </div>
  );
}
