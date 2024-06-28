"use client";
import { IRootState } from "@/redux/rootReducer";
import React from "react";
import { useSelector } from "react-redux";

export default function Chat() {
  const { user } = useSelector((state: IRootState) => state.auth);

  return (
    <div className="bg-light dark:bg-dark min-h-screen">
      {user && (
        <div className="container">
          sidebar <br /> MessageContainer
        </div>
      )}
    </div>
  );
}
