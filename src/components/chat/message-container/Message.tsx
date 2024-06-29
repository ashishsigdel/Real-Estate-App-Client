import React from "react";
import Image from "next/image";
import defaultImage from "@/assets/user/defaultProfile.jpg";
import { Message as MessageType } from "@/types/message";

interface MessageProps {
  fromMe: boolean;
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ fromMe, message }) => {
  const chatClassName = fromMe ? "items-end" : "items-start";
  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-200 dark:bg-gray-600";
  const messageColor = fromMe ? "text-white" : "text-dark dark:text-white";
  const messageImagePosition = fromMe ? "flex-row-reverse" : "flex-row";
  const dateClassName = fromMe ? "items-start" : "items-end";

  const profilePicture = message.senderId.userProfileId.profilePictureId
    ? `${process.env.NEXT_PUBLIC_API_URL}/${message.senderId.userProfileId.profilePictureId.path}/${message.senderId.userProfileId.profilePictureId.fileName}`
    : defaultImage;

  return (
    <div className={`flex flex-col ${chatClassName} mb-2`}>
      <div className={`flex gap-3 ${messageImagePosition}`}>
        <div className="w-10 rounded-full">
          <Image
            alt="Profile picture"
            src={profilePicture}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <div>
          <div
            className={`w-72 ${messageColor} ${
              message.isDeleted
                ? "bg-gray-500 italic py-1"
                : `${bubbleBgColor}  py-2`
            } px-3 rounded-md`}
          >
            {message.message}
          </div>
          {!message.isDeleted && (
            <div
              className={`text-[11px] flex gap-1 text-gray-500 dark:text-gray-600 ml-0 my-0.5 ${dateClassName}`}
            >
              <span>{new Date(message.createdAt).toLocaleString()}</span>

              {message.isEdited && (
                <>
                  {" "}
                  <span>.</span>{" "}
                  <span className="text-gray-700 dark:text-gray-300">
                    Edited
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
