import React from "react";
import loginImage from "@/assets/login/login.jpeg";
import Image from "next/image";

export default function LoginImage() {
  return (
    <div className="gi-login-img">
      <Image
        src={loginImage}
        alt="login"
        className="w-full rounded-[5px] object-cover"
        width={550}
        height={550}
      />
    </div>
  );
}
