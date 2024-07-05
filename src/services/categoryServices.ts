import { myAxios } from "@/services/apiServices";

interface CategoryForm {
  name: String;
}

export const getAllCategory = async () => {
  try {
    const response = await myAxios.get("post-category");
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const response = await myAxios.get(`/post-category/${id}`);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const addCategory = async (data: CategoryForm) => {
  try {
    const response = await myAxios.post("/categories", data);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const updateCategory = async (data: CategoryForm, id: number) => {
  try {
    const response = await myAxios.put(`/post-category/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteCategory = async (id: number) => {
  try {
    const response = await myAxios.delete(`/post-category/${id}`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
