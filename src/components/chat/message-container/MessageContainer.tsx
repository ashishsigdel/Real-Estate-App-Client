"use client";
import React, { useState } from "react";
import { TiMessages } from "react-icons/ti";
import Messages from "./Messages";
import MesssageInput from "./MesssageInput";

export default function MessageContainer() {
  const [selectedConversation, setSelectedConversation] = useState(true);
  return (
    <div className="flex flex-col w-full">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="px-4 py-3 mb-2 w-full shadow-md ">
            <span className="label-text">To:</span>{" "}
            <span className="text-dark dark:text-lightcolor font-bold">
              Ashish
            </span>
          </div>
          <Messages />
          <MesssageInput />
        </>
      )}
    </div>
  );
}

const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 Ashish ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
