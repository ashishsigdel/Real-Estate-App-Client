import { SectionHeader } from "@/utils";
import React from "react";
import { DeleteAccountForm } from "@/components/delete-account";

export default function UpdatePassword() {
  return (
    <div className="bg-light dark:bg-dark min-h-screen">
      <div className="container">
        <div className="text-center my-5 space-y-1">
          <h3 className="font-bold text-[32px] text-danger">
            Delete Your Account
          </h3>
          <p className="text-skin">Are you sure to leave ?</p>
        </div>

        <DeleteAccountForm />
      </div>
    </div>
  );
}
