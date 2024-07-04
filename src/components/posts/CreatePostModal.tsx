"use client";
import { IoClose } from "react-icons/io5";
import { RichText } from "@/components/common";
import { PopupMessage } from "@/common";
import { usePost } from "@/hooks";
import { useEffect, useState } from "react";
import { getAllCategory } from "@/services/categoryServices";

type Props = {
  closeModal: () => void;
};

interface Category {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function CreatePostModal({ closeModal }: Props) {
  const [allCategory, setAllCategory] = useState<Category[]>([]);
  console.log(allCategory);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await getAllCategory();
        setAllCategory(response.data); // Ensure we set an array
      } catch (error) {
        console.error("Error fetching categories:", error);
        setAllCategory([]); // Set to empty array on error
      }
    };
    getCategories();
  }, []);

  return (
    <div className="relative z-[50] bg-white dark:bg-dark rounded-lg shadow-3xl w-full max-w-5xl mt-100">
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Add Post
        </h3>
        <button
          type="button"
          onClick={closeModal}
          className="text-gray-500 dark:text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="default-modal"
        >
          <IoClose />
        </button>
      </div>
      <div className="p-4 md:p-5 w-full">
        <form className="flex flex-row flex-wrap mx-[-15px]">
          <span className="w-[100%] px-[15px]">
            <PopupMessage messageShowOn={"create-post"} />
          </span>
          <span className="w-[100%] mb-[27px] px-[15px]">
            <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1]">
              Title*
            </label>
            <div className="flex">
              <input
                type="text"
                name="title"
                id="title"
                className={`px-[15px] bg-transparent border-[1px] border-solid border-[#eee] dark:border-gray-500 rounded-[5px] text-gray-500 text-[14px] outline-[0] h-[50px] w-full`}
                placeholder="Title"
              />
            </div>
          </span>
          <span className="w-[100%] mb-[27px] px-[15px]">
            <RichText
              setError={() => {}}
              error=""
              value=""
              handleChange={() => {}}
              name="Description"
              update={false}
            />
          </span>

          <span className="w-[100%] mb-[27px] px-[15px]">
            <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1]">
              Photos*
            </label>
            <input type="file" accept="images/*" multiple />
          </span>
          <span className="w-[50%] mb-[27px] px-[15px]">
            <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1]">
              Category*
            </label>
            <select
              id="CategoryId"
              className={`px-[15px] bg-transparent border-[1px] border-solid border-[#eee] dark:border-gray-500 rounded-[5px] text-gray-500 text-[14px] outline-[0] h-[50px] w-full`}
              name="CategoryId"
            >
              <option value="">Select Category</option>
              {allCategory.length > 0 &&
                allCategory.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </span>
          <span className="w-[50%] mb-[27px] px-[15px]">
            <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1]">
              Country*
            </label>
            <select
              id="CategoryId"
              className={`px-[15px] bg-transparent border-[1px] border-solid border-[#eee] dark:border-gray-500 rounded-[5px] text-gray-500 text-[14px] outline-[0] h-[50px] w-full`}
              name="CategoryId"
            >
              <option value="">Select Country</option>
            </select>
          </span>
          <span className="w-[50%] mb-[27px] px-[15px]">
            <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1]">
              City*
            </label>
            <input
              type="text"
              name="city"
              id="city"
              className={`px-[15px] bg-transparent border-[1px] border-solid border-[#eee] dark:border-gray-500 rounded-[5px] text-gray-500 text-[14px] outline-[0] h-[50px] w-full`}
              placeholder="City"
            />
          </span>
          <span className="w-[50%] mb-[27px] px-[15px]">
            <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1]">
              Address*
            </label>
            <input
              type="text"
              name="address"
              id="address"
              className={`px-[15px] bg-transparent border-[1px] border-solid border-[#eee] dark:border-gray-500 rounded-[5px] text-gray-500 text-[14px] outline-[0] h-[50px] w-full`}
              placeholder="Address"
            />
          </span>
          <span className="w-[100%] mb-[27px] px-[15px]">
            <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1]">
              Discount*
            </label>
            <input type="checkbox" />
          </span>
          <span className="w-[50%] mb-[27px] px-[15px]">
            <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1]">
              Price*
            </label>
            <input
              type="number"
              name="price"
              id="price"
              className={`px-[15px] bg-transparent border-[1px] border-solid border-[#eee] dark:border-gray-500 rounded-[5px] text-gray-500 text-[14px] outline-[0] h-[50px] w-full`}
            />
          </span>

          <span className="w-[50%] mb-[27px] px-[15px]">
            <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1]">
              Discounted Price*
            </label>
            <input
              type="number"
              name="price"
              id="price"
              className={`px-[15px] bg-transparent border-[1px] border-solid border-[#eee] dark:border-gray-500 rounded-[5px] text-gray-500 text-[14px] outline-[0] h-[50px] w-full`}
            />
          </span>
          <div className="w-[100%] mb-[27px] px-[15px] flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1]">
                Public*
              </label>
              <input type="checkbox" />
            </div>
            <div className="flex">
              <button
                type="submit"
                className="py-1.5 px-3 bg-primary text-[14px] font-semibold text-white rounded-md my-4"
              >
                Add Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
