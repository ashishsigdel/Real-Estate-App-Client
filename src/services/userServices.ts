import { myAxios } from "./apiServices";

export const getUserProfile = async () => {
  try {
    const response = await myAxios.get("/users/profile");
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const updatePassword = async (
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
) => {
  try {
    const response = await myAxios.put("/users/change-password", {
      oldPassword,
      newPassword,
      confirmPassword,
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};
