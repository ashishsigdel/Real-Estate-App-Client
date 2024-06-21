import { myAxios } from "@/services/apiServices";
import { Register } from "@/types/guest";

export const register = async (formData: Register) => {
  try {
    const response = await myAxios.post("/auth/sign-up", {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phoneNumber,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });
    return response;
  } catch (error: any) {
    console.log(error);

    throw error;
  }
};
