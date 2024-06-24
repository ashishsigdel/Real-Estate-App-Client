import { removeGuest } from "@/redux/features/guestSlice";
import { setMessage } from "@/redux/features/popupMessageSlice";
import { sendEmailVerification, verifyEmail } from "@/services/authService";
import { VerifyEmail } from "@/types/guest";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useVerifyEmail() {
  const router = useRouter();
  const dispatch = useDispatch();

  const email = useSelector((state: any) => state.guest.email);

  const [formData, setFormData] = useState<VerifyEmail>({ email, otp: null });
  const [otpError, setOtpError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Function to send OTP
  const sendOtp = async () => {
    if (email) {
      try {
        setIsLoading(true);
        const response: any = await sendEmailVerification(email);

        dispatch(
          setMessage({
            message: "Otp sent successfully! Please check your email",
            type: "success",
            showOn: "verify-email",
          })
        );
        setCountdown(60);
      } catch (error: any) {
        const errorMessage =
          error.response?.data.message || "Something went wrong";
        dispatch(
          setMessage({
            message: errorMessage,
            type: "error",
            showOn: "verify-email",
          })
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      dispatch(
        setMessage({
          message: "This page doesnot exist!",
          type: "error",
          showOn: "login",
        })
      );
      router.push("/login");
    }
  };

  // Send OTP on component mount
  useEffect(() => {
    sendOtp();
  }, []);

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Redirect if authenticated
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      router.push("/profile");
    }
  }, [router]);

  const validateOtp = () => {
    if (otpInputs.join("")) {
      if (!(otpInputs.length === 6)) {
        setOtpError("Otp invalid!");
      } else {
        setOtpError("");
      }
    } else {
      setOtpError("Otp Required!");
    }
  };

  const resendOTP = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email) {
      try {
        setIsLoading(true);
        const response: any = await sendEmailVerification(email);

        dispatch(
          setMessage({
            message: "Otp sent successfully! Please check your email",
            type: "success",
            showOn: "verify-email",
          })
        );
        setCountdown(60);
      } catch (error: any) {
        const errorMessage =
          error.response?.data.message || "Something went wrong";
        dispatch(
          setMessage({
            message: errorMessage,
            type: "error",
            showOn: "verify-email",
          })
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      dispatch(
        setMessage({
          message: "This page doesnot exist!",
          type: "error",
          showOn: "login",
        })
      );
      router.push("/login");
    }
  };

  const [otpInputs, setOtpInputs] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleOtpInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const input = e.target.value;
    if (/^\d$/.test(input)) {
      const newOtpInputs = [...otpInputs];
      newOtpInputs[index] = input;
      setOtpInputs(newOtpInputs);

      if (index < 5 && input !== "") {
        const nextInputRef = inputRefs[index + 1];
        if (nextInputRef.current) {
          nextInputRef.current.focus();
        }
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otpInputs[index] === "" && index > 0) {
        const prevInputRef = inputRefs[index - 1];
        if (prevInputRef.current) {
          prevInputRef.current.focus();
        }
      }
      const newOtpInputs = [...otpInputs];
      newOtpInputs[index] = "";
      setOtpInputs(newOtpInputs);
    }
  };

  const isVerifyButtonEnabled = otpInputs.every((input) => input !== "");

  // Function to reset OTP input and error message
  const resetOtpInput = () => {
    setOtpInputs(["", "", "", "", "", ""]);
    if (otpError) {
      setOtpError("");
    }
  };

  const onSubmitVefifyEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateOtp();
    const otp = parseInt(otpInputs.join(""), 10);
    const stringOTP = otp.toString();
    if (!otpError && email) {
      setIsLoading(true);
      try {
        const response: any = await verifyEmail(stringOTP, email);
        dispatch(
          setMessage({
            message: "Email verified successfully!",
            type: "success",
            showOn: "login",
          })
        );
        dispatch(removeGuest());
        router.push("/login");
      } catch (error: any) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          if (error.response.data.errors) {
            const errors = error.response.data.errors;
            errors.map((error: any) => {
              const key = Object.keys(error)[0];
              const value = error[key];
              if (key === "otp") {
                setOtpError(value);
              }
            });
          }
          dispatch(
            setMessage({
              message: error.response.data.message,
              type: "error",
              showOn: "verify-email",
            })
          );
          return;
        }
        dispatch(
          setMessage({
            message: error.response.data.message,
            type: "error",
            showOn: "verify-email",
          })
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    otp: formData.otp,
    otpError,
    isLoading,
    countdown,
    sendOtp,
    email,
    formData,
    otpInputs,
    inputRefs,
    isVerifyButtonEnabled,
    router,
    validateOtp,
    handleOtpInputChange,
    resetOtpInput,
    handleKeyDown,
    resendOTP,
    useEffect,
    dispatch,
    setCountdown,
    onSubmitVefifyEmail,
  };
}
