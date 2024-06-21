import React from "react";
import { RegisterForm } from "@/components/register";

export default function Register() {
  return (
    <>
      <section className="gi-register py-[40px] max-[767px]:py-[30px]">
        <div className="flex flex-wrap justify-between items-center mx-auto min-[1600px]:max-w-[1600px] min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          Register
          <div className="flex flex-wrap w-full">
            <div className="gi-register-wrapper max-w-[934px] w-full my-[0] mx-auto px-[12px]">
              <div className="gi-register-container border-[1px] border-solid border-[#eee] dark:border-gray-500 p-[35px] text-left bg-[#fff] dark:bg-dark rounded-[5px] max-[575px]:p-[15px]">
                <RegisterForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
