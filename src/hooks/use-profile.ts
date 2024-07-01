import { setMessage } from "@/redux/features/popupMessageSlice";
import { IRootState } from "@/redux/rootReducer";
import {
  getOthersProfile,
  getOthersProfileById,
} from "@/services/userServices";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface userProfile {
  fullName: string;
  username: string;
  profilePicture: string;
  phone: string;
  gender: string;
  email: string;
  dob?: string;
  userId: string;
}

export default function useProfile() {
  const { user } = useSelector((state: IRootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams<{ username: string; conversationId: string }>();

  const [profileData, setProfileData] = useState<userProfile>({
    fullName: "",
    username: "",
    profilePicture: "",
    phone: "",
    gender: "",
    email: "",
    dob: "",
    userId: "",
  });
  const [profileDataById, setProfileDataById] = useState<userProfile>({
    fullName: "",
    username: "",
    profilePicture: "",
    phone: "",
    gender: "",
    email: "",
    dob: "",
    userId: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const response = await getOthersProfile(params.username);

      const data = response.data;

      const profile = data.user;
      setProfileData(profile);
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
            showOn: "profile",
          })
        );
        return;
      }
      dispatch(
        setMessage({
          message: "Somethings went wrong!",
          type: "error",
          showOn: "profile",
        })
      );
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProfileById = async () => {
    setIsLoading(true);
    try {
      const response = await getOthersProfileById(params.conversationId);

      const data = response.data;

      const profile = data.user;
      setProfileDataById(profile.userProfileId);
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
            showOn: "profile",
          })
        );
        return;
      }
      dispatch(
        setMessage({
          message: "Somethings went wrong!",
          type: "error",
          showOn: "profile",
        })
      );
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchProfile,
    fetchProfileById,
    isLoading,
    profileData,
    profileDataById,
    user,
    router,
    params,
  };
}
