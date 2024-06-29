import defaultImage from "@/assets/user/defaultProfile.jpg";
import Image from "next/image";

export default function Conversation() {
  return (
    <>
      <div className="flex gap-2 items-center hover:bg-skin rounded p-2 py-1 cursor-pointer mb-2">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <Image
              alt="Tailwind CSS chat bubble component"
              src={defaultImage}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-darkcolor dark:text-lightcolor">
              John Doe
            </p>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1" />
    </>
  );
}
