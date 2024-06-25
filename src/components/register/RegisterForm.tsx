"use client";
import { PopupMessage, Spinner } from "@/common";
import { useRegister } from "@/hooks";
import React from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
// import { PopupMessage, Spinner } from "@/components/common";

export default function RegisterForm() {
  const {
    email,
    password,
    fullName,
    phoneNumber,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    emailError,
    fullNameError,
    phoneNumberError,
    passwordError,
    confirmPasswordError,
    isLoading,
    handleChange,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    validateEmail,
    validatePassword,
    validateFullName,
    validatePhoneNumber,
    validateConfirmPassword,
    onSubmit,
  } = useRegister();
  return (
    <div className="bg-light dark:bg-dark max-w-4xl mx-auto">
      <form onSubmit={onSubmit} className="flex flex-row flex-wrap mx-[-15px]">
        <span className="w-[100%] px-[15px]">
          <PopupMessage messageShowOn={"register"} />
        </span>
        <span className="w-[100%] mb-[27px] px-[15px]">
          <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1]">
            Full Name*
          </label>
          <div className="flex">
            <input
              type="text"
              name="fullName"
              id="fullName"
              className={`px-[15px] bg-transparent border-[1px] border-solid ${
                fullNameError
                  ? "border-danger"
                  : "border-[#eee] dark:border-gray-500"
              } border-[#eee] dark:border-gray-500 rounded-[5px] text-gray-500 text-[14px] outline-[0] h-[50px] w-full`}
              placeholder="Enter your full name"
              onChange={handleChange}
              onBlur={validateFullName}
              value={fullName}
            />
          </div>
          {fullNameError && (
            <span className="text-danger text-[12px] font-normal tracking-[0] mt-1 italic leading-[1] w-full">
              {fullNameError}
            </span>
          )}
        </span>

        <span className="w-[100%] sm:w-[50%] mb-[27px] px-[15px]">
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
              value={email}
            />
          </div>
          {emailError && (
            <span className="text-danger text-[12px] font-normal tracking-[0] mt-1 italic leading-[1] w-full">
              {emailError}
            </span>
          )}
        </span>

        <span className="w-[100%] sm:w-[50%] mb-[27px] px-[15px]">
          <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1]">
            Phone Number*
          </label>
          <div className="flex">
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              className={`px-[15px] bg-transparent border-[1px] border-solid ${
                phoneNumberError
                  ? "border-danger"
                  : "border-[#eee] dark:border-gray-500"
              } border-[#eee] dark:border-gray-500 rounded-[5px] text-gray-500 text-[14px] outline-[0] h-[50px] w-full`}
              placeholder="Enter your phone number"
              onChange={handleChange}
              onBlur={validatePhoneNumber}
              value={phoneNumber}
            />
          </div>
          {phoneNumberError && (
            <span className="text-danger text-[12px] font-normal tracking-[0] mt-1 italic leading-[1] w-full">
              {phoneNumberError}
            </span>
          )}
        </span>

        <span className="w-[100%] sm:w-[50%] mb-[27px] px-[15px]">
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
              value={password}
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

        <span className="w-[100%] sm:w-[50%] mb-[27px] px-[15px]">
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
              value={confirmPassword}
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

        <span className="gi-register-btn flex flex-row justify-between items-center w-full px-[15px] max-[767px]:flex-col ">
          <span className="text-gray-500 text-[14px] tracking-[0.02rem]">
            Already have an account?
            <a
              href={"/login"}
              className="ml-[10px] text-gray-500 dark:text-gray-400 text-[14px] transition-all duration-[0.3s] ease-in-out hover:text-skin"
            >
              Login
            </a>
          </span>
          {isLoading ? (
            <Spinner />
          ) : (
            <button
              type="submit"
              className="gi-btn-1 py-[8px] px-[15px] bg-[#4b5966] text-[#fff] border-[0] transition-all duration-[0.3s] ease-in-out overflow-hidden text-center text-[14px] font-semibold relative rounded-[5px] max-[767px]:mt-[15px] hover:bg-skin"
            >
              Register
            </button>
          )}
        </span>
      </form>
    </div>
  );
}
