import create from "zustand";
import { MessageType } from "@/types/message";

interface ChatState {
  messages: MessageType[];
  setMessages: (
    messages: MessageType[] | ((prevMessages: MessageType[]) => MessageType[])
  ) => void;
}

const useChat = create<ChatState>((set) => ({
  messages: [],
  setMessages: (messages) =>
    set((state) => ({
      messages:
        typeof messages === "function" ? messages(state.messages) : messages,
    })),
}));

export default useChat;
