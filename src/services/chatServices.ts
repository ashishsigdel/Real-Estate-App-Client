import { myAxios } from "./apiServices";

interface Message {
  message: string;
}

export const fetchConversations = async () => {
  try {
    const response = await myAxios.get("/conversations");
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const fetchMessages = async (receiverId: string) => {
  try {
    const response = await myAxios.get(`/message/${receiverId}`);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const sendMessage = async (receiverId: string, message: Message) => {
  try {
    const response = await myAxios.post(`/message/send/${receiverId}`, message);
    return response;
  } catch (error: any) {
    throw error;
  }
};
