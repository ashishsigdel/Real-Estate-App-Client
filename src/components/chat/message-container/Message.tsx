"user client";
import React, { useState } from "react";
import Image from "next/image";
import defaultImage from "@/assets/user/defaultProfile.jpg";
import useMessage from "@/hooks/use-message";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MessageType } from "@/types/message";

interface MessageProps {
  fromMe: boolean;
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ fromMe, message }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message.message);
  const [showMenu, setShowMenu] = useState(false);
  const { updateAMessage, deleteAMessage } = useMessage();

  const chatClassName = fromMe ? "items-end" : "items-start";
  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-200 dark:bg-gray-600";
  const messageColor = fromMe ? "text-white" : "text-dark dark:text-white";
  const messageImagePosition = fromMe ? "flex-row-reverse" : "flex-row";
  const dateClassName = fromMe ? "items-start" : "items-end";

  const profilePicture = message.senderId.userProfileId.profilePictureId
    ? `${process.env.NEXT_PUBLIC_API_URL}/${message.senderId.userProfileId.profilePictureId.path}/${message.senderId.userProfileId.profilePictureId.fileName}`
    : defaultImage;

  const handleEditMessage = () => {
    setIsEditing(true);
  };

  const handleSaveMessage = () => {
    updateAMessage(message._id, editedMessage);
    setIsEditing(false);
    setShowMenu(false);
  };

  const handleDeleteMessage = () => {
    deleteAMessage(message._id);
    setShowMenu(false);
  };

  return (
    <div
      className={`flex flex-col ${chatClassName} mb-4 relative group hover:cursor-pointer`}
    >
      <div className={`flex items-start gap-3 ${messageImagePosition}`}>
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
            className={`flex ${
              fromMe ? "flex-row-reverse" : "flex-row"
            } items-center gap-2`}
          >
            <div
              className={`max-w-[22rem] ${messageColor} ${
                message.isDeleted
                  ? "bg-gray-500/80 italic py-1"
                  : `${bubbleBgColor} py-1.5`
              } px-3 rounded-lg`}
            >
              {isEditing ? (
                <input
                  value={editedMessage}
                  onChange={(e) => setEditedMessage(e.target.value)}
                  className="bg-transparent p-1 w-full"
                />
              ) : (
                message.message
              )}
            </div>

            {fromMe && !message.isDeleted && (
              <div className="relative hidden group-hover:flex">
                <BsThreeDotsVertical
                  className="cursor-pointer mt-1"
                  onClick={() => setShowMenu((prev) => !prev)}
                />
                {showMenu && (
                  <div className="absolute right-4 -mt-2 w-24 bg-white dark:bg-dark border border-lightcolor dark:border-darkcolor rounded shadow-lg">
                    {isEditing ? (
                      <button
                        onClick={handleSaveMessage}
                        className="w-full px-3 py-1 text-sm text-left hover:bg-lightcolor/50 hover:dark:bg-darkcolor/50"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={handleEditMessage}
                        className="w-full px-3 py-1 text-sm text-left hover:bg-lightcolor/50 hover:dark:bg-darkcolor/50"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={handleDeleteMessage}
                      className="w-full px-3 py-1 text-sm text-left hover:bg-lightcolor/50 hover:dark:bg-darkcolor/50"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {!message.isDeleted && (
        <div
          className={`px-[54px] text-[11px] flex gap-1 text-gray-500 dark:text-gray-600 ml-0 my-0.5 ${dateClassName}`}
        >
          <span>
            {new Date(message.createdAt).toLocaleString(undefined, {
              month: "numeric",
              day: "numeric",
              year: "numeric",
              hour12: true,
              hour: "numeric",
              minute: "numeric",
            })}
          </span>

          {message.isEdited && (
            <>
              {" "}
              <span>.</span>{" "}
              <span className="text-gray-700 dark:text-gray-300">Edited</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Message;
