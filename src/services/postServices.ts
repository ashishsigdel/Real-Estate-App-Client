import { myAxios } from "./apiServices";

export const createPost = async (formData: FormData) => {
  try {
    const response = await myAxios.post("/post/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};
