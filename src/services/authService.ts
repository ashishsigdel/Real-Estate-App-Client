import { myAxios } from "./apiServices";

export const sendEmailVerification = async (email: string) => {
  try {
    const response = await myAxios.post("/auth/send-email-verification", {
      email: email,
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const verifyEmail = async (otp: string, email: string) => {
  try {
    const response = await myAxios.post("/auth/verify-email", {
      otp: otp,
      email: email,
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};
