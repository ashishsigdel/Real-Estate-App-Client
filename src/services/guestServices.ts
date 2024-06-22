import { myAxios } from "@/services/apiServices";
import { Login, Register } from "@/types/guest";

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

export const login = async (formData: Login) => {
  try {
    const response = await myAxios.post("/auth/sign-in", {
      email: formData.email,
      password: formData.password,
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await myAxios.post("/password-reset/forgot-password", {
      email,
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const validateResetPasswordOtp = async (
  otp: string,
  resetToken: string
) => {
  try {
    const response = await myAxios.post("/password-reset/verify-otp", {
      otp: otp,
      resetToken: resetToken,
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const resetPassword = async (
  otp: string,
  resetToken: string,
  password: string,
  confirmPassword: string
) => {
  try {
    const response = await myAxios.post("/password-reset/reset-password", {
      otp: otp,
      resetToken: resetToken,
      password: password,
      confirmPassword: confirmPassword,
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};
