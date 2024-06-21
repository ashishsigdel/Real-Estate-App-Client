import { ThemeToggle } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assets/logo.svg";
import HeaderSearch from "./HeaderSearch";
import HeaderAccount from "./HeaderAccount";
import { FaBars } from "react-icons/fa";

export default function MainHeader() {
  return (
    <div className="bg-white dark:bg-dark border-b border-lightcolor dark:border-darkcolor text-success dark:text-skin w-full p-[18px] sticky top-0">
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="">
            <Link href="/">
              <Image
                src={logo}
                alt="logo"
                height={52}
                className="h-[52px] dark:invert"
              />
            </Link>
          </div>
          <HeaderSearch />
          <div className="sm:flex gap-3 items-center font-semibold hidden">
            <HeaderAccount />
            <ThemeToggle />
          </div>
          <div className="sm:hidden inline-block font-semibold text-2xl">
            <FaBars />
          </div>
        </div>
      </div>
    </div>
  );
}
