import React from "react";
import Message from "./Message";
import { Message as MessageType } from "@/types/message"; // Adjust path as per your project structure
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/rootReducer";

interface MessagesProps {
  messages: MessageType[];
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  const { user } = useSelector((state: IRootState) => state.auth);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages.map((msg) => (
        <>
          <Message
            key={msg._id}
            fromMe={user?.userId === msg.senderId._id}
            message={msg}
          />
        </>
      ))}
    </div>
  );
};

export default Messages;
