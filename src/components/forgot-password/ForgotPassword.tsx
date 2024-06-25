import { SectionHeader } from "@/utils";
import React from "react";
import { ForgotPasswordForm } from "@/components/forgot-password";

export default function ForgotPassword() {
  return (
    <div className="bg-light dark:bg-dark min-h-screen">
      <div className="container">
        <SectionHeader
          title="Forgot Password?"
          description="Enter you email to reset your password."
        />
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
