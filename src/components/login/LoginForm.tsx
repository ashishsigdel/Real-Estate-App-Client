"use client";
import { PopupMessage, Spinner } from "@/common";
import { useLogin } from "@/hooks";
import React from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export default function LoginForm() {
  const {
    email,
    password,
    isLoading,
    showPassword,
    emailError,
    passwordError,
    handleChange,
    togglePasswordVisibility,
    validateEmail,
    validatePassword,
    onSubmit,
  } = useLogin();
  return (
    <div className="bg-light dark:bg-dark max-w-4xl mx-auto">
      <form onSubmit={onSubmit} className="flex flex-row flex-wrap mx-[-15px]">
        <span className="w-[100%] px-[15px]">
          <PopupMessage messageShowOn={"login"} />
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
              value={email}
            />
          </div>
          {emailError && (
            <span className="text-danger text-[12px] font-normal tracking-[0] mt-1 italic leading-[1] w-full">
              {emailError}
            </span>
          )}
        </span>

        <span className="w-[100%] mb-[20px] px-[15px]">
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
        <span className="mb-[20px] px-[15px] flex justify-end w-full">
          <label className="mb-[0] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1]">
            <a
              href={"/forgot-password"}
              className="mt-[10px] text-gray-500 text-[14px] tracking-[0] flex justify-end hover:underline font-semibold"
            >
              Forgot Password?
            </a>
          </label>
        </span>

        <span className="gi-register-btn flex flex-row justify-between items-center w-full px-[15px] max-[767px]:flex-col ">
          <span className="text-gray-500 text-[14px] tracking-[0.02rem]">
            Don&#39;t have an account?
            <a
              href={"/register"}
              className="ml-[10px] text-gray-500 dark:text-gray-400 text-[14px] transition-all duration-[0.3s] ease-in-out hover:text-skin"
            >
              Register
            </a>
          </span>
          {isLoading ? (
            <Spinner />
          ) : (
            <button
              type="submit"
              className="gi-btn-1 py-[8px] px-[15px] bg-[#4b5966] text-[#fff] border-[0] transition-all duration-[0.3s] ease-in-out overflow-hidden text-center text-[14px] font-semibold relative rounded-[5px] max-[767px]:mt-[15px] hover:bg-skin"
            >
              Log In
            </button>
          )}
        </span>
      </form>
    </div>
  );
}
