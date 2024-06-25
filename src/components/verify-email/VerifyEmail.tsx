"use client";
import { SectionHeader } from "@/utils";
import React from "react";
import { VerifyEmailOtpForm } from "@/components/verify-email";

export default function VerifyEmail() {
  return (
    <div className="bg-light dark:bg-dark min-h-screen">
      <div className="container">
        <SectionHeader
          title="Verify your email"
          description="Kindly check your email and enter OTP here."
        />
        <VerifyEmailOtpForm />
      </div>
    </div>
  );
}
