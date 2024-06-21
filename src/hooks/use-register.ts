import { setMessage } from "@/redux/features/popupMessageSlice";
import { register } from "@/services/guestServices";
import { Register } from "@/types/guest";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function useRegister() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<Register>({
    email: "",
    password: "",
    fullName: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const { email, password, fullName, phoneNumber, confirmPassword } = formData;

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateFullName = () => {
    if (!formData.fullName) {
      setFullNameError("Full Name is required!");
    } else {
      setFullNameError(null);
    }
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required!");
    } else {
      setEmailError(null);
    }
  };

  const validatePhoneNumber = () => {
    if (!formData.phoneNumber) {
      setPhoneNumberError("Phone Number is required!");
    } else {
      setPhoneNumberError(null);
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required!");
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters!");
    } else {
      setPasswordError(null);
    }
  };

  const validateConfirmPassword = () => {
    if (!formData.confirmPassword) {
      setConfirmPasswordError("Confirm Password is required!");
    } else if (formData.confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match!");
    } else {
      setConfirmPasswordError(null);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateFullName();
    validateEmail();
    validatePhoneNumber();
    validatePassword();
    validateConfirmPassword();

    if (
      email &&
      password &&
      fullName &&
      phoneNumber &&
      confirmPassword &&
      !emailError &&
      !passwordError &&
      !fullNameError &&
      !phoneNumberError &&
      !confirmPasswordError
    ) {
      setIsLoading(true);
      try {
        setIsLoading(true);
        const response = await register({
          email,
          password,
          fullName,
          phoneNumber,
          confirmPassword,
        });

        const data = response.data;
        router.push("/login");
        dispatch(
          setMessage({
            message: "Registration successful! Please login to continue.",
            type: "success",
            showOn: "login",
          })
        );
      } catch (error: any) {
        dispatch(
          setMessage({
            message: error.response.data.message,
            type: "error",
            showOn: "register",
          })
        );
        // toast.error(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    email,
    password,
    fullName,
    phoneNumber,
    confirmPassword,
    formData,
    showPassword,
    showConfirmPassword,
    emailError,
    fullNameError,
    phoneNumberError,
    passwordError,
    confirmPasswordError,
    isLoading,
    handleChange,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    validateEmail,
    validatePassword,
    validateFullName,
    validatePhoneNumber,
    validateConfirmPassword,
    onSubmit,
  };
}