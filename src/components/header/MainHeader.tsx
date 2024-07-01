import { ThemeToggle } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assets/logo.svg";
import HeaderSearch from "./HeaderSearch";
import HeaderAccount from "./HeaderAccount";
import { FaBars } from "react-icons/fa";
import { HiChatBubbleOvalLeft } from "react-icons/hi2";
import { PiWechatLogoFill } from "react-icons/pi";

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
            <a href="/chat">
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <PiWechatLogoFill className="text-[32px]" />
              </div>
            </a>
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
