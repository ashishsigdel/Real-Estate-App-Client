"use client";
import { Security, UserInfo } from "@/components/profile";
import { useProfile } from "@/hooks";
import { SectionHeader } from "@/utils";
import Image from "next/image";
import { useEffect } from "react";
import defaultImage from "@/assets/user/defaultProfile.jpg";
import { PopupMessage, Spinner } from "@/common";
import { BiSolidMessageRounded } from "react-icons/bi";

export default function OthersProfile() {
  const { fetchProfile, isLoading, profileData, user, router, params } =
    useProfile();

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (user?.username === params.username) {
      router.push("/profile");
    }
  }, [user, params.username, router]);

  if (!profileData) {
    return <div>Loading...</div>;
  }
  const inputCss =
    "px-[15px] bg-transparent border-[1px] border-solid border-[#eee] dark:border-gray-500 rounded-[5px] text-[16px] font-medium outline-0 h-[50px] w-full";

  return (
    <div className="bg-light dark:bg-dark min-h-screen">
      {profileData && (
        <div className="container">
          <SectionHeader
            title={`${profileData.fullName.split(" ")[0]}'s Profile`}
            description=""
          />
          <div className="mt-[44px] mx-[12px] lg:mx-0">
            <div className="mb-2">
              <span className="text-[20px] font-semibold">User Info</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center border-t border-[#eee] dark:border-gray-500 pt-[48px] gap-[32px]">
              <div className="flex justify-center w-full mx-auto items-end mb-10 ">
                <Image
                  src={profileData.profilePicture || defaultImage}
                  width={1000}
                  height={1000}
                  priority={true}
                  alt="Profile Picture"
                  className="w-72 h-72 object-cover rounded-full border-4 border-skin"
                />
              </div>
              <div className="flex flex-row flex-wrap mx-[-15px]">
                <span className="px-[15px] flex justify-end w-full mb-[20px] ">
                  {/* <a href={`/chat/${profileData.userId}`}> */}
                  <a href="/chat">
                    <button
                      type="submit"
                      className="py-[8px] px-[15px] bg-[#4b5966] text-[#fff] border-[0] transition-all duration-[0.3s] ease-in-out overflow-hidden text-center text-[14px] font-semibold relative rounded-[5px] max-[767px]:mt-[15px] hover:bg-skin flex items-center gap-2"
                    >
                      <BiSolidMessageRounded className="text-xl" />
                      Message
                    </button>
                  </a>
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
                      value={profileData.username}
                      disabled
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
                      value={profileData.fullName}
                      disabled
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
                      value={profileData.email}
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
                      value={profileData.phone}
                      disabled
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
                      value={profileData.gender}
                      disabled
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
                      value={profileData.dob}
                      disabled
                    />
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
