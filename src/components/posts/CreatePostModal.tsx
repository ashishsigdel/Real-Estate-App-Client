"use client";
import { IoClose } from "react-icons/io5";
import { PopupMessage } from "@/common";
import { RichText } from "@/components/common";
import { usePost } from "@/hooks";
import { useEffect } from "react";
import { TbPhotoPlus } from "react-icons/tb";

type Props = {
  closeModal: () => void;
};

export default function CreatePostModal({ closeModal }: Props) {
  const {
    getAllCategory,
    allCategory,
    getAllCountry,
    allCountry,
    handleChange,
    formData,
    handleDescriptionChange,
    handleFileChange,
    handleSubmit,
    selectedFiles,
    thumbnails,
    handleRemoveThumbnail,
  } = usePost();

  useEffect(() => {
    getAllCategory();
    getAllCountry();
  }, []);

  return (
    <div className="relative z-50 bg-white dark:bg-dark rounded-lg shadow-3xl w-full max-w-4xl mt-10 mx-3">
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
        <form
          onSubmit={handleSubmit}
          className="flex flex-row flex-wrap mx-[-15px]"
        >
          <span className="w-full mb-6 px-3">
            <label className="block mb-1 text-gray-500 dark:text-gray-400 text-sm font-medium tracking-wide">
              Title*
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:border-primary dark:bg-dark"
              placeholder="Title"
              onChange={handleChange}
              value={formData.title}
            />
          </span>
          <span className="w-full mb-6 px-3">
            <RichText
              value={formData.description}
              handleChange={handleDescriptionChange}
              name="Description"
            />
          </span>
          <span className="w-full mb-6 px-3">
            <label className="block mb-1 text-gray-500 dark:text-gray-400 text-sm font-medium tracking-wide">
              Photos*
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              id="media"
              name="media"
              className="hidden"
            />
            <div className="grid grid-cols-3 gap-4 mt-2">
              {thumbnails.map((thumbnail, index) => (
                <div key={index} className="relative">
                  <img
                    src={thumbnail}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveThumbnail(index)}
                    className="absolute top-1 right-1 p-1 bg-white dark:bg-gray-800 rounded-full text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500"
                  >
                    <IoClose />
                  </button>
                </div>
              ))}
            </div>
            <label
              htmlFor="media"
              className="cursor-pointer block mt-2 dark:text-primary-light hover:underline"
            >
              <TbPhotoPlus className="text-2xl" />
            </label>
          </span>
          <span className="w-[100%] sm:w-[50%] mb-[27px] px-[15px]">
            <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1]">
              Category*
            </label>
            <select
              id="category"
              className={`px-[15px] bg-transparent border-[1px] border-solid border-[#eee] dark:border-gray-500 rounded-[5px] text-gray-500 text-[14px] outline-[0] h-[50px] w-full`}
              name="category"
              onChange={handleChange}
            >
              <option value="">-----Select Category-----</option>

              {allCategory.length > 0 &&
                allCategory.map((category) => (
                  <option
                    key={category._id}
                    value={category._id}
                    className="capitalize"
                  >
                    {category.name}
                  </option>
                ))}
            </select>
          </span>
          <span className="w-[100%] sm:w-[50%] mb-[27px] px-[15px]">
            <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1]">
              Country*
            </label>
            <select
              id="country"
              className={`px-[15px] bg-transparent border-[1px] border-solid border-[#eee] dark:border-gray-500 rounded-[5px] text-gray-500 text-[14px] outline-[0] h-[50px] w-full`}
              name="country"
              onChange={handleChange}
            >
              <option value="">-----Select Country-----</option>

              {allCountry.length > 0 &&
                allCountry.map((country) => (
                  <option
                    key={country._id}
                    value={country._id}
                    className="capitalize"
                  >
                    {country.name}
                  </option>
                ))}
            </select>
          </span>
          <span className="w-[100%] sm:w-[50%] mb-[27px] px-[15px]">
            <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1]">
              City*
            </label>
            <input
              type="text"
              name="city"
              id="city"
              className={`px-[15px] bg-transparent border-[1px] border-solid border-[#eee] dark:border-gray-500 rounded-[5px] text-gray-500 text-[14px] outline-[0] h-[50px] w-full`}
              placeholder="City"
              onChange={handleChange}
              value={formData.city}
            />
          </span>
          <span className="w-[100%] sm:w-[50%] mb-[27px] px-[15px]">
            <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1]">
              Address*
            </label>
            <input
              type="text"
              name="address"
              id="address"
              className={`px-[15px] bg-transparent border-[1px] border-solid border-[#eee] dark:border-gray-500 rounded-[5px] text-gray-500 text-[14px] outline-[0] h-[50px] w-full`}
              placeholder="Address"
              onChange={handleChange}
              value={formData.address}
            />
          </span>
          <span className="w-[100%] mb-[27px] px-[15px]">
            <div className="flex gap-2 items-center">
              <label className="inline-block text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1]">
                Discount
              </label>
              <input
                type="checkbox"
                id="discountStatus"
                name="discountStatus"
                className="w-5"
                onChange={handleChange}
                checked={formData.discountStatus === true}
              />
            </div>
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
              onChange={handleChange}
              value={formData.price}
            />
          </span>

          <span className="w-[50%] mb-[27px] px-[15px]">
            <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1]">
              Discounted Price
            </label>
            <input
              type="number"
              name="discountPrice"
              id="discountPrice"
              className={`px-[15px] bg-transparent border-[1px] border-solid border-[#eee] dark:border-gray-500 rounded-[5px] text-gray-500 text-[14px] outline-[0] h-[50px] w-full`}
              disabled={!formData.discountStatus}
              onChange={handleChange}
              value={formData.discountPrice}
            />
          </span>
          <div className="w-full mb-6 px-3">
            <PopupMessage messageShowOn={"create-post"} />
          </div>
          <div className="w-full mb-6 px-3 flex justify-between items-center">
            <div className="flex items-center">
              <label className="text-gray-500 dark:text-gray-400 text-sm font-medium tracking-wide">
                Public
              </label>
              <input
                type="checkbox"
                id="status"
                name="status"
                className="ml-2 h-4 w-4 text-primary dark:text-primary-light focus:ring-primary dark:focus:ring-primary-light rounded"
                onChange={handleChange}
                checked={formData.status === "published"}
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md shadow-sm hover:bg-opacity-90"
            >
              {formData.status === "published" ? "Add Post" : "Save Draft"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
