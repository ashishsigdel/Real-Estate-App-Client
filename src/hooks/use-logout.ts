import { removeAuth } from "@/redux/features/authSlice";
import { setMessage } from "@/redux/features/popupMessageSlice";
import { logout } from "@/services/authService";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function useLogout() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await logout();

      const data = response.data;
      localStorage.clear();
      dispatch(removeAuth());
      router.replace("/");
    } catch (error: any) {
      localStorage.clear();
      dispatch(removeAuth());
      router.replace("/");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    onSubmit,
    isLoading,
  };
}
