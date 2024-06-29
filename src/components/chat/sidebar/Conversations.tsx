"use client";
import { useConversations } from "@/hooks";
import Conversation from "./Conversation";
import { useEffect } from "react";

const Conversations = () => {
  const { fetchChatUsers, chatUsers } = useConversations();
  useEffect(() => {
    fetchChatUsers();
  }, []);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {chatUsers.map((user, index) => (
        <Conversation key={index} userData={user} />
      ))}
    </div>
  );
};
export default Conversations;
