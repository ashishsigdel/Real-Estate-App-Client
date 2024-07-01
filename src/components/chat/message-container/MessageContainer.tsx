"use client";
import React, { useEffect, useState } from "react";
import { TiMessages } from "react-icons/ti";
import Messages from "./Messages";
import MesssageInput from "./MessageInput";
import { usePathname, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/rootReducer";
import useMessage from "@/hooks/use-message";
import useProfile from "@/hooks/use-profile";
import { Spinner } from "@/common";

export default function MessageContainer() {
  const [selectedConversation, setSelectedConversation] = useState<string>("");
  const pathname = usePathname();
  const params = useParams<{ conversationId: string }>();
  const { user } = useSelector((state: IRootState) => state.auth);
  const { fetchConversation } = useMessage();
  const { fetchProfileById, profileDataById } = useProfile();

  useEffect(() => {
    fetchProfileById();
  }, []);

  useEffect(() => {
    if (params && params.conversationId) {
      setSelectedConversation(params.conversationId);
      fetchConversation();
    } else if (pathname === "/chat") {
      setSelectedConversation("");
    }
  }, [pathname, params]);

  return (
    <div className="flex flex-col w-full">
      {!selectedConversation ? (
        <NoChatSelected user={user} />
      ) : (
        <>
          <div className="px-4 py-3 mb-2 w-full shadow-md">
            <span className="label-text">To:</span>{" "}
            <span className="text-dark dark:text-lightcolor font-bold">
              {profileDataById.fullName}
            </span>
          </div>
          <Messages />
          <MesssageInput />
        </>
      )}
    </div>
  );
}

const NoChatSelected = ({ user }: { user: any }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-dark dark:text-white font-semibold flex flex-col items-center gap-2">
        {user ? (
          <>
            {" "}
            <p>Welcome 👋 {user ? user.fullName.split(" ")[0] : "User"} ❄</p>
            <p>Select a chat to start messaging</p>
            <TiMessages className="text-3xl md:text-6xl text-center" />
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};
