export type Login = {
  email: string;
  password: string;
};

export type Register = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

export type ForgotPassword = {
  email: string | null;
  resetToken: string | null;
  password: string | null;
  confirmPassword: string | null;
  otp: string | null;
};

export type VerifyEmail = {
  email: string | null;
  otp: string | null;
};
