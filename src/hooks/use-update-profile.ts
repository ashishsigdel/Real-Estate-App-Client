import { setAuth } from "@/redux/features/authSlice";
import { setMessage } from "@/redux/features/popupMessageSlice";
import { updateUserProfile } from "@/services/userServices";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

interface ProfileState {
  username?: string;
  fullName?: string;
  email?: string;
  gender?: string;
  dob?: string;
  phone?: string;
  profilePicture?: File;
}

const useUpdateProfile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<ProfileState>({});
  const [file, setFile] = useState<File | undefined>(undefined);

  const dispatch = useDispatch();

  const { username, fullName, email, gender, dob, phone, profilePicture } =
    formData;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      setFormData({
        ...formData,
        profilePicture: files[0],
      });
    } else {
      setFile(undefined);
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    let updatedFormData = { ...formData };
    if (event.target.name !== "image") {
      updatedFormData = {
        ...formData,
        [event.target.name]: event.target.value,
      };
    }
    setFormData(updatedFormData);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      if (Object.keys(formData).length !== 0) {
        const response = await updateUserProfile(formData);
        dispatch(
          setMessage({
            message: "User info update successfully.",
            type: "success",
            showOn: "update-profile",
          })
        );

        const user = response.userProfile;

        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(setAuth(user));
      } else {
        dispatch(
          setMessage({
            message: "There must be a change.",
            type: "error",
            showOn: "update-profile",
          })
        );
      }
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
            showOn: "update-profile",
          })
        );
      } else {
        dispatch(
          setMessage({
            message: "Something went wrong!",
            type: "error",
            showOn: "update-profile",
          })
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleChange,
    handleFileChange,
    onSubmit,
    formData,
    file,
  };
};

export default useUpdateProfile;
