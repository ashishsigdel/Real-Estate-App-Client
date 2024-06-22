import { SectionHeader } from "@/utils";
import React from "react";
import { ResetPasswordForm } from "@/components/reset-password";

export default function ResetPassword() {
  return (
    <div className="bg-light dark:bg-dark min-h-screen">
      <div className="container">
        <SectionHeader
          title="Reset Password"
          description="Enter new password to recover your account."
        />
        <ResetPasswordForm />
      </div>
    </div>
  );
}
