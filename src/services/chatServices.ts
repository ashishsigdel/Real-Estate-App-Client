import { myAxios } from "./apiServices";

export const fetchConversations = async () => {
  try {
    const response = await myAxios.get("/conversations");
    return response;
  } catch (error: any) {
    throw error;
  }
};
