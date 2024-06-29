import defaultImage from "@/assets/user/defaultProfile.jpg";
import Image from "next/image";

const Messages = ({ fromMe }: any) => {
  const chatClassName = fromMe ? "items-end" : "items-start";
  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-200 dark:bg-gray-600";
  const messageColor = fromMe ? "text-white" : "text-dark dark:text-white";
  const messageImagePosition = fromMe ? "flex-row-reverse" : "flex-row";

  return (
    <div className="px-4 flex-1 overflow-auto">
      <div className={`flex flex-col ${chatClassName} mb-2`}>
        <div className={`flex gap-3 ${messageImagePosition}`}>
          <div className="w-10 rounded-full">
            <Image
              alt="Tailwind CSS chat bubble component"
              src={defaultImage}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div
            className={`w-72 ${messageColor} ${bubbleBgColor} px-3 py-2 rounded-md`}
          >
            Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello
            Hello Hello Hello Hello Hello
          </div>
        </div>
        <div className="text-[10px] flex gap-1 items-center text-gray-400 dark:text-gray-700">
          26 May
        </div>
      </div>
    </div>
  );
};

export default Messages;
