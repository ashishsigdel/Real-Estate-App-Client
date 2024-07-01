"use client";

import { IRootState } from "@/redux/rootReducer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import defaultImage from "@/assets/user/defaultProfile.jpg";
import { BiSolidCameraPlus } from "react-icons/bi";
import { PopupMessage, Spinner } from "@/common";
import { useUpdateProfile } from "@/hooks";

export default function UserInfo() {
  const { user } = useSelector((state: IRootState) => state.auth);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const {
    isLoading,
    handleChange,
    onSubmit,
    formData,
    handleFileChange,
    file,
  } = useUpdateProfile();

  if (!user) {
    return null;
  }

  const { username, fullName, email, gender, dob, phone, profilePicture } =
    formData;
  const picture: any = user?.profilePicture;

  const inputCss =
    "px-[15px] bg-transparent border-[1px] border-solid border-[#eee] dark:border-gray-500 rounded-[5px] text-[16px] font-medium outline-0 h-[50px] w-full";

  let imageSource: any = defaultImage;
  if (picture) {
    imageSource = picture;
  }
  if (file) {
    const objectUrl = URL.createObjectURL(file);
    imageSource = objectUrl;
  }

  return (
    <div className="mt-[44px] mx-[12px] lg:mx-0">
      <div className="mb-2">
        <span className="text-[20px] font-semibold">User Info</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center border-t border-[#eee] dark:border-gray-500 pt-[48px] gap-[32px]">
        <div className="flex justify-center w-full mx-auto items-end mb-10 ">
          <Image
            src={imageSource}
            width={1000}
            height={1000}
            priority={true}
            alt="Profile Picture"
            className="w-72 h-72 object-cover rounded-full border-4 border-skin"
          />
          <div
            onClick={() => fileRef.current?.click()}
            className="relative right-[5rem] bottom-[1rem] text-2xl bg-skin p-2 rounded-full cursor-pointer"
          >
            <BiSolidCameraPlus />
          </div>
        </div>
        <div className="">
          <form
            encType="multipart/form-data"
            className="flex flex-row flex-wrap mx-[-15px]"
            onSubmit={onSubmit}
          >
            <input
              type="file"
              name="image"
              accept="image/*"
              hidden
              ref={fileRef}
              onChange={handleFileChange}
            />
            <span className="w-[100%] px-[15px]">
              <PopupMessage messageShowOn={"update-profile"} />
            </span>
            <span className="w-[100%] md:w-[50%] mb-[27px] px-[15px] flex items-center gap-5">
              <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1] whitespace-nowrap">
                Username:
              </label>
              <div className="flex w-full">
                <input
                  type="text"
                  name="username"
                  id="username"
                  className={inputCss}
                  placeholder="Enter your username"
                  value={username ?? user.username}
                  onChange={handleChange}
                />
              </div>
            </span>
            <span className="w-[100%] md:w-[50%] mb-[27px] px-[15px] flex items-center gap-5">
              <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1] whitespace-nowrap">
                Full Name:
              </label>
              <div className="flex w-full">
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className={inputCss}
                  placeholder="Enter your full name"
                  value={fullName ?? user.fullName}
                  onChange={handleChange}
                />
              </div>
            </span>
            <span className="w-[100%] mb-[27px] px-[15px] flex items-center gap-5">
              <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1] whitespace-nowrap">
                Email:
              </label>
              <div className="flex w-full">
                <input
                  type="text"
                  name="email"
                  id="email"
                  className={inputCss}
                  placeholder="Enter your email"
                  value={email ?? user.email}
                  disabled
                />
              </div>
            </span>
            <span className="w-[100%] mb-[27px] px-[15px] flex items-center gap-5">
              <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1] whitespace-nowrap">
                Phone Number:
              </label>
              <div className="flex w-full">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className={inputCss}
                  placeholder="Enter your phone number"
                  value={phone ?? user.phone}
                  onChange={handleChange}
                />
              </div>
            </span>
            <span className="w-[50%] mb-[27px] px-[15px] flex items-center gap-5">
              <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1] whitespace-nowrap">
                Gender:
              </label>
              <div className="flex w-full">
                <select
                  title="Gender"
                  name="gender"
                  id="gender"
                  className={inputCss}
                  value={gender ?? user.gender ?? ""}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </span>
            <span className="w-[50%] mb-[27px] px-[15px] flex items-center gap-5">
              <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1] whitespace-nowrap">
                DOB:
              </label>
              <div className="flex w-full">
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  className={inputCss}
                  placeholder="Enter your date of birth"
                  value={dob ?? user.dob}
                  onChange={handleChange}
                />
              </div>
            </span>
            <span className="flex flex-row justify-end items-center w-full px-[15px] max-[767px]:flex-col mt-[14px]">
              {isLoading ? (
                <Spinner />
              ) : (
                <button
                  type="submit"
                  className="py-[8px] px-[15px] bg-[#4b5966] text-[#fff] border-[0] transition-all duration-[0.3s] ease-in-out overflow-hidden text-center text-[14px] font-semibold relative rounded-[5px] max-[767px]:mt-[15px] hover:bg-skin"
                >
                  Update Profile
                </button>
              )}
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
