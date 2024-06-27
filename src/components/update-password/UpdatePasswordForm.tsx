"use client";
import { PopupMessage, Spinner } from "@/common";
import useUpdatePassword from "@/hooks/use-update-password";
import { setMessage } from "@/redux/features/popupMessageSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useDispatch } from "react-redux";

export default function ResetPasswordForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    oldPassword,
    newPassword,
    confirmPassword,
    formData,
    showOldPassword,
    showNewPassword,
    showConfirmPassword,
    oldPasswordError,
    newPasswordError,
    confirmPasswordError,
    isLoading,
    handleChange,
    toggleOldPasswordVisibility,
    toggleNewPasswordVisibility,
    toggleConfirmPasswordVisibility,
    validateOldPassword,
    validateNewPassword,
    validateConfirmPassword,
    useEffect,
    onSubmitUpdatePassword,
  } = useUpdatePassword();

  return (
    <div className="bg-light dark:bg-dark max-w-xl mx-auto">
      <form
        onSubmit={onSubmitUpdatePassword}
        className="flex flex-row flex-wrap mx-[-15px]"
      >
        <span className="w-[100%] px-[15px]">
          <PopupMessage messageShowOn={"update-password"} />
        </span>
        <span className="w-[100%] mb-[27px] px-[15px]">
          <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1]">
            Old Password*
          </label>
          <div className="flex relative">
            <input
              type={showOldPassword ? "text" : "password"}
              name="oldPassword"
              placeholder="Enter your old password"
              id="oldPassword"
              className={`px-[15px] bg-transparent border-[1px] border-solid ${
                oldPasswordError
                  ? "border-danger"
                  : "border-[#eee] dark:border-gray-500"
              } border-[#eee] dark:border-gray-500 rounded-[5px] text-gray-500 text-[14px] outline-[0] h-[50px] w-full transition-all duration-[0.3s] ease-in-out`}
              onChange={handleChange}
              onBlur={validateOldPassword}
              value={oldPassword ?? ""}
              autoComplete="off"
            />

            <div className="absolute inset-y-0 right-0 top-0 pr-3 flex justify-center items-center text-sm h-full">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300 "
                onClick={toggleOldPasswordVisibility}
              >
                <span className="sr-only">Show password</span>
                {showOldPassword ? (
                  <BsEye
                    className={`${oldPasswordError ? "text-danger" : ""}`}
                  />
                ) : (
                  <BsEyeSlash
                    className={`${oldPasswordError ? "text-danger" : ""}`}
                  />
                )}
              </button>
            </div>
          </div>
          {oldPasswordError && (
            <span className="text-danger text-[12px] font-normal tracking-[0] mt-1 italic leading-[1] w-full">
              {oldPasswordError}
            </span>
          )}
        </span>

        <span className="w-[100%] mb-[27px] px-[15px]">
          <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1]">
            Password*
          </label>
          <div className="flex relative">
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              placeholder="Enter new password"
              id="newPassword"
              className={`px-[15px] bg-transparent border-[1px] border-solid ${
                newPassword
                  ? "border-danger"
                  : "border-[#eee] dark:border-gray-500"
              } border-[#eee] dark:border-gray-500 rounded-[5px] text-gray-500 text-[14px] outline-[0] h-[50px] w-full transition-all duration-[0.3s] ease-in-out`}
              onChange={handleChange}
              onBlur={validateNewPassword}
              value={newPassword ?? ""}
              autoComplete="off"
            />

            <div className="absolute inset-y-0 right-0 top-0 pr-3 flex justify-center items-center text-sm h-full">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300 "
                onClick={toggleNewPasswordVisibility}
              >
                <span className="sr-only">Show password</span>
                {showNewPassword ? (
                  <BsEye
                    className={`${newPasswordError ? "text-danger" : ""}`}
                  />
                ) : (
                  <BsEyeSlash
                    className={`${newPassword ? "text-danger" : ""}`}
                  />
                )}
              </button>
            </div>
          </div>
          {newPasswordError && (
            <span className="text-danger text-[12px] font-normal tracking-[0] mt-1 italic leading-[1] w-full">
              {newPasswordError}
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
              placeholder="Confirm your password"
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
