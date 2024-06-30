"use client";
import React from "react";
import { BsSend } from "react-icons/bs";
import { PopupMessage } from "@/common";
import useMessage from "@/hooks/use-message";

export default function MesssageInput() {
  const { handleMessageChange, isLoading, sendAMessage, typedMessage } =
    useMessage();

  return (
    <>
      <span className="w-[100%] px-[15px] mt-3 p-2">
        <PopupMessage messageShowOn={"chat"} />
      </span>
      <form
        onSubmit={sendAMessage}
        className="flex items-center gap-2 px-2 pb-2"
      >
        <div className="px-3 py-2 rounded-md flex items-center text-darkcolor/80 gap-2 border border-lightcolor dark:border-darkcolor w-full">
          <input
            type="text"
            id="message"
            name="message"
            placeholder="Type Message..."
            value={typedMessage}
            className="bg-transparent focus:outline-none placeholder:text-darkcolor/50 dark:placeholder:text-gray-500 text-darkcolor dark:text-gray-300 w-full"
            onChange={handleMessageChange}
            autoComplete="off"
          />
          <button disabled={isLoading} type="submit">
            <div className="text-skin">
              <BsSend />
            </div>
          </button>
        </div>
      </form>
    </>
  );
}
