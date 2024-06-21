"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { LanguageChanger } from "@/utils";
import { toast } from "react-toastify";

export default function Home() {
  const t = useTranslations("message");
  const handleToast = () => {
    toast.success("Toast Working successfullly.");
  };

  return (
    <div className="bg-light dark:bg-dark">
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex flex-col text-center justify-center items-center">
          <div className="flex gap-x-2"></div>
          <div className="text-[60px] text-black font-bold ">
            {t("welcome")}
          </div>
          <LanguageChanger />
          <button onClick={handleToast} className="border p-2">
            Check Toast
          </button>
        </div>
      </div>
    </div>
  );
}
