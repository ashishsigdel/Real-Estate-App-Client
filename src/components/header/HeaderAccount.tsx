"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { FaUser, FaHeart, FaShoppingBag } from "react-icons/fa";
import { setMessage } from "@/redux/features/popupMessageSlice";
import { useRouter } from "next/navigation";
import { IRootState } from "@/redux/rootReducer";
import { useLogOut } from "@/hooks";
import Image from "next/image";

export default function HeaderAccount() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { onSubmit, isLoading } = useLogOut();

  const { isAuthenticated, user } = useSelector(
    (state: IRootState) => state.auth
  );

  const handleLogoutClick = (event: any) => {
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <div className="flex items-center">
      {/* Header User Start */}
      <div className="relative group cursor-pointer mr-8">
        <div
          className="flex items-center text-gray-500 transition-all duration-300 ease-in-out"
          title="Account"
        >
          <div className="relative flex text-2xl leading-[17px] text-gray-500 dark:text-gray-400">
            {user && user?.profilePicture ? (
              <Image
                src={user.profilePicture}
                alt="user"
                width={200}
                height={200}
                className="w-10 h-10 object-cover rounded-full border-2 border-skin"
              />
            ) : (
              <FaUser />
            )}
          </div>
          <div className="flex flex-col uppercase ml-2.5">
            <span className="transition-all duration-300 ease-in-out text-xs leading-none text-gray-500 dark:text-gray-400 mb-1.5 tracking-wider capitalize font-medium">
              Account
            </span>
            <span className="transition-all duration-300 ease-in-out text-sm font-medium text-gray-500 dark:text-gray-400 leading-[14px] max-[1199px]:text-xs max-[1199px]:min-w-[48px]">
              {isAuthenticated ? `${user?.fullName.split(" ")[0]}` : "Login"}
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

              <li>
                <div
                  className="cursor-pointer block py-2 px-5 text-sm font-normal text-gray-500 dark:text-lightcolor hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={handleLogoutClick}
                >
                  {isLoading ? "Logging Out" : "Log Out"}
                </div>
              </li>
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
