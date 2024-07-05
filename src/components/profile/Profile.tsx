"use client";
import { Security, UserInfo } from "@/components/profile";
import { IRootState } from "@/redux/rootReducer";
import { SectionHeader } from "@/utils";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function Profile() {
  const { user } = useSelector((state: IRootState) => state.auth);
  const searchParams = useSearchParams();

  const openedTab = searchParams.get("tab");

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
