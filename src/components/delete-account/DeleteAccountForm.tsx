"use client";
import { PopupMessage, Spinner } from "@/common";
import { useDeleteAccount } from "@/hooks";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export default function ResetPasswordForm() {
  const {
    onSubmitDeleteAccount,
    showPassword,
    password,
    passwordError,
    validatePassword,
    handleChange,
    togglePasswordVisibility,
    confirmTextError,
    validateConfirmText,
    confirmText,
    isLoading,
    isButtonEnable,
  } = useDeleteAccount();

  return (
    <div className="bg-light dark:bg-dark max-w-xl mx-auto">
      <form
        onSubmit={onSubmitDeleteAccount}
        className="flex flex-row flex-wrap mx-[-15px]"
      >
        <span className="w-[100%] px-[15px]">
          <PopupMessage messageShowOn={"delete-account"} />
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
              } rounded-[5px] text-gray-500 text-[14px] outline-[0] h-[50px] w-full transition-all duration-[0.3s] ease-in-out`}
              onChange={handleChange}
              onBlur={validatePassword}
              value={password ?? ""}
              autoComplete="off"
            />
            <div className="absolute inset-y-0 right-0 top-0 pr-3 flex justify-center items-center text-sm h-full">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300"
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
            Type <span className="text-danger">sudo delete my account</span> to
            continue
          </label>
          <div className="flex relative">
            <input
              type="text"
              name="confirmText"
              placeholder="sudo delete my account"
              id="confirmText"
              className={`px-[15px] bg-transparent border-[1px] border-solid ${
                confirmTextError
                  ? "border-danger"
                  : "border-[#eee] dark:border-gray-500"
              } rounded-[5px] text-gray-500 text-[14px] outline-[0] h-[50px] w-full transition-all duration-[0.3s] ease-in-out`}
              onChange={handleChange}
              onBlur={validateConfirmText}
              value={confirmText ?? ""}
              autoComplete="off"
            />
          </div>
          {confirmTextError && (
            <span className="text-danger text-[12px] font-normal tracking-[0] mt-1 italic leading-[1] w-full">
              {confirmTextError}
            </span>
          )}
        </span>

        <span className="flex flex-row justify-end items-center w-full px-[15px] max-[767px]:flex-col">
          <span className="text-gray-500 text-[14px] tracking-[0.02rem]"></span>
          {isLoading ? (
            <Spinner />
          ) : (
            <button
              type="submit"
              disabled={confirmText !== "sudo delete my account"}
              className={`py-[8px] px-[15px] ${
                confirmText !== "sudo delete my account"
                  ? "bg-danger"
                  : "bg-red-600"
              } text-[#fff] border-[0] transition-all duration-[0.3s] ease-in-out overflow-hidden text-center text-[14px] font-semibold relative rounded-[5px] max-[767px]:mt-[15px] hover:bg-danger/90`}
            >
              Delete Account
            </button>
          )}
        </span>
      </form>
    </div>
  );
}
