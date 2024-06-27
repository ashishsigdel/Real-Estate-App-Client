import {
  removeGuest,
  setEmail,
  setOtp,
  setResetToken,
} from "@/redux/features/guestSlice";
import { setMessage } from "@/redux/features/popupMessageSlice";
import { verifyEmail } from "@/services/authService";
import { updatePassword } from "@/services/userServices";
import { UpdatePassword } from "@/types/user";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useUpdatePassword() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<UpdatePassword>({
    oldPassword: null,
    newPassword: null,
    confirmPassword: null,
  });

  const { oldPassword, newPassword, confirmPassword } = formData;

  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [oldPasswordError, setOldPasswordError] = useState<string | null>(null);
  const [newPasswordError, setNewPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedFormData = {
      ...formData,
      [event.target.name]: event.target.value,
    };
    setFormData(updatedFormData);
  };

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateOldPassword = () => {
    if (!oldPassword) {
      setOldPasswordError("Password is required!");
    } else {
      setOldPasswordError(null);
    }
  };

  const validateNewPassword = () => {
    if (!formData.newPassword) {
      setNewPasswordError("New Password is required!");
    } else if (formData.newPassword.length < 8) {
      setNewPasswordError("Password must be at least 8 characters!");
    } else {
      setNewPasswordError(null);
    }
  };
  const validateConfirmPassword = () => {
    if (!formData.confirmPassword) {
      setConfirmPasswordError("Confirm Password is required!");
    } else if (formData.confirmPassword !== newPassword) {
      setConfirmPasswordError("Passwords do not match!");
    } else {
      setConfirmPasswordError(null);
    }
  };

  const onSubmitUpdatePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateOldPassword();
    validateNewPassword();
    validateConfirmPassword();

    if (
      !oldPasswordError &&
      !newPasswordError &&
      !confirmPasswordError &&
      oldPassword &&
      newPassword &&
      confirmPassword
    ) {
      try {
        setIsLoading(true);
        const response: any = await updatePassword(
          oldPassword,
          newPassword,
          confirmPassword
        );
        dispatch(
          setMessage({
            message: "Password Update successfully!",
            type: "success",
            showOn: "profile",
          })
        );
        router.push("/profile");
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
              showOn: "update-password",
            })
          );
          return;
        }
        dispatch(
          setMessage({
            message: "Somethings went wrong!",
            type: "error",
            showOn: "update-password",
          })
        );
        return;
      } finally {
        setIsLoading(false);
      }
    }
  };
  return {
    oldPassword,
    newPassword,
    confirmPassword,
    formData,
    showOldPassword,
    showNewPassword,
    showConfirmPassword,
    oldPasswordError,
    newPasswordError,
    confirmPasswordError,
    isLoading,
    router,
    handleChange,
    toggleOldPasswordVisibility,
    toggleNewPasswordVisibility,
    toggleConfirmPasswordVisibility,
    validateOldPassword,
    validateNewPassword,
    validateConfirmPassword,
    useEffect,
    onSubmitUpdatePassword,
    dispatch,
  };
}
