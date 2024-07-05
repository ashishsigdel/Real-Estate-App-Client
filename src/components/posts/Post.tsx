"use client";
import { Security, UserInfo } from "@/components/profile";
import { IRootState } from "@/redux/rootReducer";
import { SectionHeader } from "@/utils";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "@/components/modal";
import { CreatePostModal } from "@/components/posts";

export default function Post() {
  const { user } = useSelector((state: IRootState) => state.auth);
  const searchParams = useSearchParams();

  const openedTab = searchParams.get("tab") || "posts";

  const isActive = (tab: string) => {
    return tab === openedTab ? "bg-lightcolor dark:bg-darkcolor" : "";
  };

  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="bg-light dark:bg-dark min-h-screen">
      {user && (
        <div className="container">
          <SectionHeader title="Your Posts" description="" />
          <div className="flex justify-between w-full border-b border-lightcolor dark:border-darkcolor py-3">
            <div className="flex gap-3 items-center">
              <a
                href="/posts?tab=posts"
                className={`hover:bg-lightcolor hover:dark:bg-darkcolor px-3 py-2 rounded-full ${isActive(
                  "posts"
                )}`}
              >
                <span>Posts</span>
              </a>
              <a
                href="/posts?tab=drafts"
                className={`hover:bg-lightcolor hover:dark:bg-darkcolor px-3 py-2 rounded-full ${isActive(
                  "drafts"
                )}`}
              >
                <span>Drafts</span>
              </a>
            </div>
            <button
              onClick={openModal}
              className="py-[8px] px-[15px] bg-[#4b5966] text-[#fff] border-[0] transition-all duration-[0.3s] ease-in-out overflow-hidden text-center text-[14px] font-semibold relative rounded-[5px] max-[767px]:mt-[15px] hover:bg-skin"
            >
              Create Post
            </button>
          </div>
        </div>
      )}
      <Modal isOpen={showModal}>
        <CreatePostModal closeModal={closeModal} />
      </Modal>
    </div>
  );
}
