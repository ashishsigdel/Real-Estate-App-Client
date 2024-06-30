"use client";
import React, { useEffect, useRef } from "react";
import Message from "./Message";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/rootReducer";
import { useMessage } from "@/hooks";

const Messages: React.FC = () => {
  const { user } = useSelector((state: IRootState) => state.auth);
  const { messages } = useMessage();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // This will scroll to bottom whenever messages change

  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages.map((msg) => (
        <Message
          key={msg._id}
          fromMe={user?.userId === msg.senderId._id}
          message={msg}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
