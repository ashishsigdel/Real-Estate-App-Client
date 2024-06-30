import { setMessage } from "@/redux/features/popupMessageSlice";
import { IRootState } from "@/redux/rootReducer";
import {
  deleteMessage,
  fetchMessages,
  sendMessage as sendMessageService,
  updateMessage,
} from "@/services/chatServices";
import { useParams } from "next/navigation";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MessageType } from "@/types/message";

export default function useMessage() {
  const dispatch = useDispatch();
  const params = useParams<{ username: string; conversationId: string }>();
  const [typedMessage, setTypedMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTypedMessage(event.target.value);
  };

  const fetchConversation = async () => {
    setIsLoading(true);
    try {
      const response = await fetchMessages(params.conversationId);
      const data: MessageType[] = response.data;
      setMessages(data);
    } catch (error: any) {
      console.error("Error fetching messages:", error);
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
      } else {
        dispatch(
          setMessage({
            message: "Something went wrong!",
            type: "error",
            showOn: "profile",
          })
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const sendAMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await sendMessageService(params.conversationId, {
        message: typedMessage,
      });
      const data: MessageType = response.data;
      setTypedMessage("");
      setMessages((prevMessages) => [...prevMessages, data]);
    } catch (error: any) {
      console.error("Error sending message:", error);
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
      } else {
        dispatch(
          setMessage({
            message: "Something went wrong!",
            type: "error",
            showOn: "chat",
          })
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateAMessage = async (messageId: string, newMessage: string) => {
    try {
      const response = await updateMessage(messageId, { message: newMessage });
      const data: MessageType = response.data;

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === data._id
            ? { ...msg, message: data.message, isEdited: data.isEdited }
            : msg
        )
      );
    } catch (error: any) {
      console.error("Error updating message:", error);
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
      } else {
        dispatch(
          setMessage({
            message: "Something went wrong!",
            type: "error",
            showOn: "chat",
          })
        );
      }
    }
  };

  const deleteAMessage = async (messageId: string) => {
    try {
      const response = await deleteMessage(messageId);
      const data: MessageType = response.data;

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === data._id
            ? { ...msg, message: data.message, isDeleted: data.isDeleted }
            : msg
        )
      );
    } catch (error: any) {
      console.error("Error deleting message:", error);
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
      } else {
        dispatch(
          setMessage({
            message: "Something went wrong!",
            type: "error",
            showOn: "chat",
          })
        );
      }
    }
  };

  useEffect(() => {
    if (params && params.conversationId) {
      fetchConversation();
    }
  }, [params.conversationId]);

  useEffect(() => {
    console.log("Messages state updated:", messages);
  }, [messages]);

  return {
    typedMessage,
    handleMessageChange,
    sendAMessage,
    updateAMessage,
    deleteAMessage,
    isLoading,
    fetchConversation,
    messages,
  };
}
