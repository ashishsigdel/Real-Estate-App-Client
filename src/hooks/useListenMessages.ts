import { useEffect } from "react";
import { useSocketContext } from "@/context/SocketContext";
import useChat from "@/zustand/useChat";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useChat();

  useEffect(() => {
    const handleNewMessage = (newMessage: any) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket?.on("newMessage", handleNewMessage);

    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [socket, setMessages]);
};

export default useListenMessages;
