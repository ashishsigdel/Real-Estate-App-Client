import React from "react";
import { Sidebar } from "@/components/chat";
import { MessageContainer } from "@/components/chat";

export default function Chat() {
  return (
    <div className="bg-light dark:bg-dark w-full">
      <div className="container">
        <div className="flex w-full h-[calc(100vh-96px)] overflow-hidden border-x border-b border-lightcolor dark:border-darkcolor">
          <Sidebar />
          <MessageContainer />
        </div>
      </div>
    </div>
  );
}
