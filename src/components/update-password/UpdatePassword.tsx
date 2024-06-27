import { SectionHeader } from "@/utils";
import React from "react";
import { UpdatePasswordForm } from "@/components/update-password";

export default function UpdatePassword() {
  return (
    <div className="bg-light dark:bg-dark min-h-screen">
      <div className="container">
        <SectionHeader
          title="Update Password"
          description="Change your password, Keep account safe!"
        />
        <UpdatePasswordForm />
      </div>
    </div>
  );
}
