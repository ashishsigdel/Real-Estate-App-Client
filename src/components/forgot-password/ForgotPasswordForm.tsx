"use client";
import { PopupMessage, Spinner } from "@/common";
import { useForgotPassword } from "@/hooks";
import React from "react";

export default function ForgotPasswordForm() {
  const {
    email,
    emailError,
    isLoading,
    handleChange,
    validateEmail,
    onSubmitSendOTP,
  } = useForgotPassword();
  return (
    <div className="bg-light dark:bg-dark max-w-xl mx-auto">
      <form
        onSubmit={onSubmitSendOTP}
        className="flex flex-row flex-wrap mx-[-15px]"
      >
        <span className="w-[100%] px-[15px]">
          <PopupMessage messageShowOn={"forgot-password"} />
        </span>

        <span className="w-[100%] mb-[27px] px-[15px]">
          <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1]">
            Email Address*
          </label>
          <div className="flex">
            <input
              type="email"
              name="email"
              id="email"
              className={`px-[15px] bg-transparent border-[1px] border-solid ${
                emailError
                  ? "border-danger"
                  : "border-[#eee] dark:border-gray-500"
              } border-[#eee] dark:border-gray-500 rounded-[5px] text-gray-500 text-[14px] outline-[0] h-[50px] w-full`}
              placeholder="Enter your email address"
              onChange={handleChange}
              onBlur={validateEmail}
              value={email ?? ""}
            />
          </div>
          {emailError && (
            <span className="text-danger text-[12px] font-normal tracking-[0] mt-1 italic leading-[1] w-full">
              {emailError}
            </span>
          )}
        </span>

        <span className="flex flex-row justify-end items-center w-full px-[15px] max-[767px]:flex-col ">
          <span className="text-gray-500 text-[14px] tracking-[0.02rem]"></span>
          {isLoading ? (
            <Spinner />
          ) : (
            <button
              type="submit"
              className="py-[8px] px-[15px] bg-[#4b5966] text-[#fff] border-[0] transition-all duration-[0.3s] ease-in-out overflow-hidden text-center text-[14px] font-semibold relative rounded-[5px] max-[767px]:mt-[15px] hover:bg-skin"
            >
              Send OTP
            </button>
          )}
        </span>
      </form>
    </div>
  );
}
