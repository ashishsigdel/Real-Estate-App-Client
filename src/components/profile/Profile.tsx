"use client";
import { Security, UserInfo } from "@/components/profile";
import { IRootState } from "@/redux/rootReducer";
import { SectionHeader } from "@/utils";
import { useSelector } from "react-redux";

export default function Profile() {
  const { user } = useSelector((state: IRootState) => state.auth);

  return (
    <div className="bg-light dark:bg-dark min-h-screen">
      {user && (
        <div className="container">
          <SectionHeader
            title="Profile"
            description="You’re all set! Dive into your profile and personalize it now."
          />
          <UserInfo />
          <Security />
        </div>
      )}
    </div>
  );
}
