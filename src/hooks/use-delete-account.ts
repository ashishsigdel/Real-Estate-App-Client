import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { setMessage } from "@/redux/features/popupMessageSlice";
import { deleteAccount } from "@/services/authService";

interface DeleteAccount {
  password: string;
  confirmText: string;
}

export default function useDeleteAccount() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<DeleteAccount>({
    password: "",
    confirmText: "",
  });

  const { password, confirmText } = formData;

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmTextError, setConfirmTextError] = useState<string | null>(null);
  const [isButtonEnable, setIsButtonEnable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = () => {
    setPasswordError(password ? null : "Password is required!");
  };

  const validateConfirmText = () => {
    if (!confirmText) {
      setConfirmTextError("This field is required!");
    } else if (confirmText !== "sudo delete my account") {
      setConfirmTextError("Please enter correct text.");
    } else {
      setConfirmTextError(null);
      setIsButtonEnable(true);
    }
  };

  const onSubmitDeleteAccount = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validatePassword();
    validateConfirmText();

    if (!passwordError && !confirmTextError && password && confirmText) {
      try {
        setIsLoading(true);
        const response: any = await deleteAccount(password, confirmText);
        dispatch(
          setMessage({
            message: "User Deleted!",
            type: "error",
            showOn: "login",
          })
        );
        localStorage.clear();
        router.push("/login");
      } catch (error: any) {
        const errorMessage =
          error.response?.data.message || "Something went wrong!";
        dispatch(
          setMessage({
            message: errorMessage,
            type: "error",
            showOn: "delete-account",
          })
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    onSubmitDeleteAccount,
    showPassword,
    password,
    passwordError,
    validatePassword,
    handleChange,
    togglePasswordVisibility,
    confirmTextError,
    validateConfirmText,
    confirmText,
    isLoading,
    isButtonEnable,
  };
}
