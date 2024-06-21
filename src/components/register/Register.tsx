import { SectionHeader } from "@/utils";
import React from "react";
import RegisterForm from "./RegisterForm";
// import { RegisterForm } from "@/components/register";

export default function Register() {
  return (
    <div className="bg-light dark:bg-dark">
      <div className="container">
        <SectionHeader
          title="Register"
          description="Create your account, It's very easy."
        />
        <RegisterForm />
      </div>
    </div>
  );
}
