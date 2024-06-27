"use client";

import { IRootState } from "@/redux/rootReducer";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Security() {
  const { user } = useSelector((state: IRootState) => state.auth);

  return (
    <div className="my-[44px] mx-[12px] lg:mx-0">
      <div className="mb-2">
        <span className="text-[20px] font-semibold">Security</span>
      </div>
      <div className="my-5 border-t border-[#eee] dark:border-gray-500 py-[48px]">
        <div className="flex items-center">
          <span className="text-moderate">Password: </span>
          <Link href="/update-password" className="ml-28 sm:ml-40 absolute">
            <button
              type="submit"
              className="py-[8px] px-[15px] bg-[#4b5966] text-[#fff] border-[0] transition-all duration-[0.3s] ease-in-out overflow-hidden text-center text-[14px] font-semibold relative rounded-[5px] max-[767px]:mt-[15px] hover:bg-skin"
            >
              Change Password
            </button>
          </Link>
        </div>
      </div>
      <div className="flex items-center">
        <Link href="/delete-account" className="">
          <button className="bg-red-500 py-2 px-5 rounded-md text-white font-medium">
            Delete Account
          </button>
        </Link>
      </div>
    </div>
  );
}
