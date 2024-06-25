import { SectionHeader } from "@/utils";
import React from "react";
import { VerifyOtpForm } from "@/components/verify-otp";

export default function VerifyOtp() {
  return (
    <div className="bg-light dark:bg-dark min-h-screen">
      <div className="container">
        <SectionHeader
          title="Verify your OTP"
          description="Kindly check your email and enter OTP here."
        />
        <VerifyOtpForm />
      </div>
    </div>
  );
}
