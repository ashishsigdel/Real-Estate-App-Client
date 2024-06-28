import { myAxios } from "./apiServices";

interface UserProfileData {
  username?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  gender?: string;
  dob?: string;
}

export const getUserProfile = async () => {
  try {
    const response = await myAxios.get("/users/profile");
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getOthersProfile = async (username: string) => {
  try {
    const response = await myAxios.get(`/users/profile/${username}`);
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

export const updateUserProfile = async (formData: UserProfileData) => {
  try {
    const response = await myAxios.put("/users/profile/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};
