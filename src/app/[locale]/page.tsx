"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

export default function Home() {
  const t = useTranslations("message");
  const handleToast = () => {
    toast.success("Toast Working successfullly.");
  };

  return <div className="bg-light dark:bg-dark">Home</div>;
}
