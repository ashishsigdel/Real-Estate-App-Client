import { ThemeToggle } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assets/logo.svg";
import HeaderSearch from "./HeaderSearch";
import HeaderAccount from "./HeaderAccount";

export default function MainHeader() {
  return (
    <div className="bg-light text-success dark:bg-extraDark shadow-sm dark:text-skin w-full p-[18px] sticky top-0">
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
          <div className="flex gap-3 items-center font-semibold">
            <HeaderAccount />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
