import { SectionHeader } from "@/utils";
import React from "react";
import { LoginForm, LoginImage } from "@/components/login";

export default function Register() {
  return (
    <div className="bg-light dark:bg-dark min-h-screen">
      <div className="container">
        <SectionHeader
          title="Log In"
          description="Enter you detail to access your account."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px] items-center">
          <LoginImage />
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
