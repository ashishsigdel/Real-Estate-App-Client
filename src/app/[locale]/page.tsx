import React from "react";
import { useTranslations } from "next-intl";
import { LanguageChanger } from "@/utils";

export default function Home() {
  const t = useTranslations("message");

  return (
    <div className="bg-light dark:bg-dark">
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex flex-col text-center justify-center items-center">
          <div className="flex gap-x-2"></div>
          <div className="text-[60px] text-black font-bold ">
            {t("welcome")}
          </div>
          <LanguageChanger />
        </div>
      </div>
    </div>
  );
}
