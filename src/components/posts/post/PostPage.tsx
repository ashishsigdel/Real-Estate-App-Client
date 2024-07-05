"use client";
import { useGetPost } from "@/hooks";
import { SectionHeader } from "@/utils";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Spinner } from "@/common";
import "@/styles/posts.scss";
import { IoLocationSharp } from "react-icons/io5";

export default function PostPage() {
  const { fetchPost, post, isLoading } = useGetPost();

  useEffect(() => {
    fetchPost();
  }, []);

  if (isLoading || !post || !post.post) {
    return (
      <div className="bg-light dark:bg-dark min-h-screen">
        <div className="container w-screen h-screen flex justify-center items-center">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light dark:bg-dark min-h-screen">
      <div className="container py-3 text-center">
        {post.post.title !== undefined && (
          <SectionHeader title={`${post.post.title}`} description="" />
        )}

        <p className="my-3 px-3 py-1 bg-lightcolor dark:bg-darkcolor rounded-full w-fit mx-auto">
          {post?.post?.categoryId?.name}
        </p>
      </div>
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        loop={true}
        slidesPerView={1}
        pagination={{ clickable: true, type: "bullets" }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
      >
        {post.mediaUrls.map((image: string, index: number) => (
          <SwiperSlide key={index}>
            <div
              className="h-[550px]"
              style={{
                background: `url(${image}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="container py-3 mt-[22px]">
        <div></div>
        <div className="text-2xl space-x-2 bg-lightcolor dark:bg-darkcolor px-3 py-2 rounded-md inline-block">
          <span>Rs.</span>
          <span
            className={`${
              post.post.discountStatus
                ? "line-through text-red-500"
                : "text-green-500"
            }`}
          >
            {post.post.price}
          </span>
          {post.post.discountStatus && (
            <span className="text-green-500">
              {post.post.price - post.post.discountPrice}
            </span>
          )}
        </div>
        <div className="my-6 flex gap-2 items-center">
          <IoLocationSharp className="text-2xl" />
          <span>
            {post.post.address}, {post.post.city}, {post.post?.countryId?.name}
          </span>
        </div>

        <div className="mt-6">
          <h3 className="text-3xl font-bold">Description</h3>
          <div
            className=" post-content"
            dangerouslySetInnerHTML={{ __html: post.post.description }}
          />
        </div>
        <div className="my-[30px]">
          <h3 className="text-2xl font-bold my-3">Send Message : </h3>
          <form>
            <textarea
              name=""
              id=""
              placeholder="Enter message..."
              className="p-[8px] bg-transparent border-[1px] border-solid border-[#eee] dark:border-gray-500 rounded-[5px] text-gray-500 text-[14px] outline-[0] h-[50px] w-full resize-none"
            />
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                className="py-[8px] px-[15px] bg-[#4b5966] text-[#fff] border-[0] transition-all duration-[0.3s] ease-in-out overflow-hidden text-center text-[14px] font-semibold relative rounded-[5px] max-[767px]:mt-[15px] hover:bg-skin items-end"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
