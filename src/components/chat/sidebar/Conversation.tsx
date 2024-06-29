import defaultImage from "@/assets/user/defaultProfile.jpg";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Conversation({ userData }: any) {
  const [chatWith, setChatWith] = useState<any>({});
  const pathname = usePathname();

  useEffect(() => {
    if (userData) {
      setChatWith(userData.participants.userProfileId);
    }
  }, [userData]);

  const isActive = pathname === `/chat/${userData.participants._id}`;

  const profilePicture = chatWith.profilePictureId
    ? `${process.env.NEXT_PUBLIC_API_URL}/${chatWith.profilePictureId.path}/${chatWith.profilePictureId.fileName}`
    : defaultImage;

  return (
    <>
      <a href={`/chat/${userData.participants._id}`}>
        <div
          className={`flex gap-2 items-center hover:bg-lightcolor/50 dark:hover:bg-darkcolor/50 rounded p-2 py-[6px] cursor-pointer mb-2 ${
            isActive && "bg-lightcolor/50 dark:bg-darkcolor/50"
          }`}
        >
          <div className="avatar online">
            <div className="w-12 rounded-full">
              <Image
                alt="Profile Picture"
                src={profilePicture}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <div className="flex gap-3 justify-between">
              <p className="font-bold text-darkcolor dark:text-lightcolor">
                {chatWith.fullName}
              </p>
            </div>
          </div>
        </div>

        <div className="divider my-0 py-0 h-1" />
      </a>
    </>
  );
}
