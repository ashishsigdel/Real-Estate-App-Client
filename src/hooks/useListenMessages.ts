import { useEffect } from "react";
import { useSocketContext } from "@/context/SocketContext";
import useChat from "@/zustand/useChat";
import { MessageType } from "@/types/message";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useChat();

  useEffect(() => {
    const handleNewMessage = (newMessage: MessageType) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket?.on("newMessage", handleNewMessage);

    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [socket, setMessages]);

  return { messages };
};

export default useListenMessages;
