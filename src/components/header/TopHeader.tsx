"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaPhone } from "react-icons/fa";

export default function TopHeader() {
  const pathname = usePathname();

  if (pathname === "/chat") {
    return null;
  }
  return (
    <div className="bg-gray-100 text-success dark:bg-slate-950 dark:text-skin w-full p-[10px]">
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center font-semibold">
            <FaPhone />
            <span className="text-sm">+1 234 567 890</span>
          </div>
          <div className="sm:flex gap-3 items-center font-semibold hidden">
            <span className="text-sm">
              World&#39;s best platform for buying and selling properties.
            </span>
          </div>
          <div className="flex gap-3 items-center font-semibold">
            <span className="text-sm hidden md:inline-block">Need Help?</span>
            <Link href={"#"}>
              <span className="text-sm hover:underline">Help Center</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
