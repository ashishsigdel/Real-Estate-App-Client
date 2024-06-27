import { Security, UserInfo } from "@/components/profile";
import { SectionHeader } from "@/utils";

export default function Profile() {
  return (
    <div className="bg-light dark:bg-dark min-h-screen">
      <div className="container">
        <SectionHeader
          title="Profile"
          description="You’re all set! Dive into your profile and personalize it now."
        />
        <UserInfo />
        <Security />
      </div>
    </div>
  );
}
