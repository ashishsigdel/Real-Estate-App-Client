"use client";
import { PopupMessage, Spinner } from "@/common";
import { useForgotPassword } from "@/hooks";
import { setMessage } from "@/redux/features/popupMessageSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useDispatch } from "react-redux";

export default function ResetPasswordForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    isLoading,
    handleChange,
    showPassword,
    togglePasswordVisibility,
    password,
    passwordError,
    confirmPassword,
    confirmPasswordError,
    showConfirmPassword,
    toggleConfirmPasswordVisibility,
    validatePassword,
    validateConfirmPassword,
    onSubmitResetPassword,
    email,
    resetToken,
    otp,
  } = useForgotPassword();

  useEffect(() => {
    if (
      email === "" ||
      email === null ||
      resetToken === null ||
      resetToken === "" ||
      otp === "" ||
      otp === null
    ) {
      dispatch(
        setMessage({
          message: "Invalid reset link",
          type: "error",
          showOn: "forgot-password",
        })
      );
      router.push("/forgot-password");
    }
  }, [email, resetToken, dispatch]);
  return (
    <div className="bg-light dark:bg-dark max-w-xl mx-auto">
      <form
        onSubmit={onSubmitResetPassword}
        className="flex flex-row flex-wrap mx-[-15px]"
      >
        <span className="w-[100%] px-[15px]">
          <PopupMessage messageShowOn={"reset-password"} />
        </span>

        <span className="w-[100%] mb-[27px] px-[15px]">
          <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1]">
            Password*
          </label>
          <div className="flex relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              id="password"
              className={`px-[15px] bg-transparent border-[1px] border-solid ${
                passwordError
                  ? "border-danger"
                  : "border-[#eee] dark:border-gray-500"
              } border-[#eee] dark:border-gray-500 rounded-[5px] text-gray-500 text-[14px] outline-[0] h-[50px] w-full transition-all duration-[0.3s] ease-in-out`}
              onChange={handleChange}
              onBlur={validatePassword}
              value={password ?? ""}
              autoComplete="off"
            />

            <div className="absolute inset-y-0 right-0 top-0 pr-3 flex justify-center items-center text-sm h-full">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300 "
                onClick={togglePasswordVisibility}
              >
                <span className="sr-only">Show password</span>
                {showPassword ? (
                  <BsEye className={`${passwordError ? "text-danger" : ""}`} />
                ) : (
                  <BsEyeSlash
                    className={`${passwordError ? "text-danger" : ""}`}
                  />
                )}
              </button>
            </div>
          </div>
          {passwordError && (
            <span className="text-danger text-[12px] font-normal tracking-[0] mt-1 italic leading-[1] w-full">
              {passwordError}
            </span>
          )}
        </span>

        <span className="w-[100%] mb-[27px] px-[15px]">
          <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1]">
            Confirm Password*
          </label>
          <div className="flex relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Enter your password"
              id="confirmPassword"
              className={`px-[15px] bg-transparent border-[1px] border-solid ${
                confirmPasswordError
                  ? "border-danger"
                  : "border-[#eee] dark:border-gray-500"
              } border-[#eee] dark:border-gray-500 rounded-[5px] text-gray-500 text-[14px] outline-[0] h-[50px] w-full transition-all duration-[0.3s] ease-in-out`}
              onChange={handleChange}
              onBlur={validateConfirmPassword}
              value={confirmPassword ?? ""}
              autoComplete="off"
            />

            <div className="absolute inset-y-0 right-0 top-0 pr-3 flex justify-center items-center text-sm h-full">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300 "
                onClick={toggleConfirmPasswordVisibility}
              >
                <span className="sr-only">Show password</span>
                {showConfirmPassword ? (
                  <BsEye
                    className={`${confirmPasswordError ? "text-danger" : ""}`}
                  />
                ) : (
                  <BsEyeSlash
                    className={`${confirmPasswordError ? "text-danger" : ""}`}
                  />
                )}
              </button>
            </div>
          </div>
          {confirmPasswordError && (
            <span className="text-danger text-[12px] font-normal tracking-[0] mt-1 italic leading-[1] w-full">
              {confirmPasswordError}
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
              Reset Password
            </button>
          )}
        </span>
      </form>
    </div>
  );
}
