"use client";
import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/rootReducer";
import useChat from "@/zustand/useChat";
import useListenMessages from "@/hooks/useListenMessages";

const Messages: React.FC = () => {
  const { user } = useSelector((state: IRootState) => state.auth);
  const { messages } = useChat();
  useListenMessages();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        messagesContainerRef.current;
      if (scrollTop + clientHeight < scrollHeight) {
        setIsUserScrolling(true);
      } else {
        setIsUserScrolling(false);
      }
    }
  };

  useEffect(() => {
    const container = messagesContainerRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [messages]);

  useEffect(() => {
    if (!isUserScrolling) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages, isUserScrolling]);

  return (
    <div ref={messagesContainerRef} className="px-4 flex-1 overflow-auto">
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
