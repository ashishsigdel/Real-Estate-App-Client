import { ChangeEvent, FormEvent, useState } from "react";
import { getAllCategory } from "@/services/categoryServices";
import { getAllCountry } from "@/services/countryServices";
import { createPost } from "@/services/postServices";
import { ItemTypes, PostType } from "@/types/post";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setMessage } from "@/redux/features/popupMessageSlice";

export default function usePost() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [allCategory, setAllCategory] = useState<ItemTypes[]>([]);
  const [allCountry, setAllCountry] = useState<ItemTypes[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<PostType>>({
    title: "",
    description: "",
    category: "",
    country: "",
    city: "",
    address: "",
    price: undefined,
    discountStatus: false,
    discountPrice: undefined,
    status: "draft",
    media: [],
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    if (type === "checkbox") {
      const checked = (event.target as HTMLInputElement).checked;
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === "status" ? (checked ? "published" : "draft") : checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "number" ? Number(value) : value,
      }));
    }
  };

  const handleDescriptionChange = (value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: value,
    }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);

      // Generate thumbnails
      const thumbnailsArray = filesArray.map((file) =>
        URL.createObjectURL(file)
      );
      setThumbnails((prevThumbnails) => [
        ...prevThumbnails,
        ...thumbnailsArray,
      ]);
    }
  };

  const handleRemoveThumbnail = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);

    const updatedThumbnails = [...thumbnails];
    updatedThumbnails.splice(index, 1);
    setThumbnails(updatedThumbnails);
  };

  const getCategories = async () => {
    try {
      const response = await getAllCategory();
      setAllCategory(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setAllCategory([]);
    }
  };

  const getCountries = async () => {
    try {
      const response = await getAllCountry();
      setAllCountry(response.data.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
      setAllCountry([]);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();

      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined) {
          formDataToSend.append(key, value.toString());
        }
      });

      // Append files
      selectedFiles.forEach((file) => {
        formDataToSend.append("media", file);
      });

      const response = await createPost(formDataToSend);

      dispatch(
        setMessage({
          message: "Created Successfully.",
          type: "success",
          showOn: "posts",
        })
      );

      router.push(`/post/${response.data.post._id}`);
    } catch (error: any) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        dispatch(
          setMessage({
            message: error.response.data.message,
            type: "error",
            showOn: "create-post",
          })
        );
        return;
      }
      dispatch(
        setMessage({
          message: "Something went wrong!",
          type: "error",
          showOn: "create-post",
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getAllCategory: getCategories,
    allCategory,
    getAllCountry: getCountries,
    allCountry,
    formData,
    setFormData,
    handleChange,
    handleDescriptionChange,
    handleFileChange,
    handleSubmit,
    selectedFiles,
    thumbnails,
    handleRemoveThumbnail,
  };
}
