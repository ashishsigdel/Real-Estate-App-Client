"use client";
import { useForgotPassword, useVerifyEmail } from "@/hooks";
import { PopupMessage, Spinner } from "@/common";
import React, { useEffect } from "react";
import { setMessage } from "@/redux/features/popupMessageSlice";

export default function VerifyEmailOtpForm() {
  const {
    otp,
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
  } = useVerifyEmail();

  const handleResendOtp = (event: any) => {
    event.preventDefault();
    if (countdown === null || countdown === 0) {
      resendOTP(event);
      setCountdown(60);
    }
  };

  return (
    <div className="bg-light dark:bg-dark max-w-xl mx-auto">
      <form
        onSubmit={onSubmitVefifyEmail}
        className="flex flex-row flex-wrap mx-[-15px]"
      >
        <span className="w-[100%] px-[15px]">
          <PopupMessage messageShowOn={"verify-email"} />
        </span>
        <span className="w-full mb-[27px] px-[15px]">
          <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1]">
            OTP*
          </label>
          <div className="flex justify-between">
            {otpInputs.map((otpInput, index) => (
              <input
                key={index}
                type="text"
                name="otp"
                id={`otp-${index}`}
                className={`px-[12px] bg-transparent border-[1px] border-solid ${
                  otpError
                    ? "border-danger"
                    : "border-[#eee] dark:border-gray-500"
                } border-[#eee] dark:border-gray-500 rounded-[5px] text-gray-500 text-[14px] outline-[0] h-[30px] w-[30px] sm:h-[50px] sm:w-[50px] md:h-[50px] md:w-[50px] text-center`}
                onChange={(e) => handleOtpInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onBlur={validateOtp}
                value={otpInput}
                ref={inputRefs[index]}
                maxLength={1}
                inputMode="numeric"
                required
              />
            ))}
          </div>
          {otpError && (
            <span className="text-danger text-[12px] font-normal tracking-[0] mt-1 italic leading-[1] w-full">
              {otpError}
            </span>
          )}
        </span>

        <span className="flex flex-row justify-between items-center w-full px-[15px] max-[767px]:flex-col ">
          <span
            onClick={handleResendOtp}
            className={`text-gray-500 dark:text-gray-400 cursor-pointer text-[14px] tracking-[0.02rem] ${
              countdown !== null && countdown > 0
                ? "pointer-events-none opacity-50"
                : ""
            }`}
          >
            {countdown !== null && countdown > 0
              ? `Resend OTP in ${countdown}s`
              : "Didn't receive OTP? Resend"}
          </span>
          {isLoading ? (
            <Spinner />
          ) : (
            <button
              type="submit"
              className="gi-btn-1 py-[8px] px-[15px] bg-[#4b5966] text-[#fff] border-[0] transition-all duration-[0.3s] ease-in-out overflow-hidden text-center text-[14px] font-semibold relative rounded-[5px] max-[767px]:mt-[15px] hover:bg-skin"
            >
              Validate OTP
            </button>
          )}
        </span>
      </form>
    </div>
  );
}
