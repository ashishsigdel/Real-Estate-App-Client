import { setMessage } from "@/redux/features/popupMessageSlice";
import { IRootState } from "@/redux/rootReducer";
import {
  deleteMessage,
  sendMessage as sendMessageService,
  updateMessage,
} from "@/services/chatServices";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useMessage() {
  const { user } = useSelector((state: IRootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams<{ username: string; conversationId: string }>();
  const [typedMessage, setTypedMessage] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTypedMessage(event.target.value);
  };

  const sendAMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await sendMessageService(params.conversationId, {
        message: typedMessage,
      });
      const data = response.data;
      console.log(data);
      setTypedMessage(""); // Clear the input field after sending the message
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
            showOn: "chat",
          })
        );
        return;
      }
      dispatch(
        setMessage({
          message: "Something went wrong!",
          type: "error",
          showOn: "chat",
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const updateAMessage = async (messageId: string, newMessage: string) => {
    try {
      await updateMessage(messageId, { message: newMessage });
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
            showOn: "chat",
          })
        );
        return;
      }
      dispatch(
        setMessage({
          message: "Something went wrong!",
          type: "error",
          showOn: "chat",
        })
      );
    }
  };

  const deleteAMessage = async (messageId: string) => {
    try {
      await deleteMessage(messageId);
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
            showOn: "chat",
          })
        );
        return;
      }
      dispatch(
        setMessage({
          message: "Something went wrong!",
          type: "error",
          showOn: "chat",
        })
      );
    }
  };

  return {
    typedMessage,
    handleMessageChange,
    sendAMessage,
    updateAMessage,
    deleteAMessage,
    isLoading,
  };
}
