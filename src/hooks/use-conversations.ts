import { setMessage } from "@/redux/features/popupMessageSlice";
import { IRootState } from "@/redux/rootReducer";
import { fetchConversations } from "@/services/chatServices";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useProfile() {
  const { user } = useSelector((state: IRootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const [chatUsers, setChatUsers] = useState([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchChatUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetchConversations();

      const data = response.data.conversations;

      setChatUsers(data);
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
    fetchChatUsers,
    isLoading,
    chatUsers,
    router,
    params,
  };
}
