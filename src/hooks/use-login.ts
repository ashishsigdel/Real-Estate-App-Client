import { encryptAccessToken } from "@/helper/Helper";
import { setAuth } from "@/redux/features/authSlice";
import { setEmail } from "@/redux/features/guestSlice";
import { setMessage } from "@/redux/features/popupMessageSlice";
import { login } from "@/services/guestServices";
import { Login } from "@/types/guest";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function useLogin() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<Login>({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
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

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required!");
    } else {
      setEmailError(null);
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

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateEmail();
    validatePassword();

    if (email && password && !emailError && !passwordError) {
      setIsLoading(true);
      try {
        setIsLoading(true);

        const response = await login({
          email,
          password,
        });

        const data = response.data;
        const user = JSON.stringify(data.user);

        if (user && response.data.user.isEmailVerified) {
          const accessToken: string = data.accessToken;
          const encryptedAccessToken: string = encryptAccessToken(accessToken);

          localStorage.setItem("accessToken", encryptedAccessToken);

          localStorage.setItem("user", user);

          dispatch(setAuth(data.user));
          router.push("/");
        } else {
          dispatch(
            setMessage({
              message: "Please verify your email first.",
              type: "warning",
              showOn: "verify-email",
            })
          );
          dispatch(setEmail(email));
          router.push("/verify-email");
        }
      } catch (error: any) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          if (error.response.data.errors) {
            const errors = error.response.data.errors;

            errors.map((error: any) => {
              const key = Object.keys(error)[0];
              const value = error[key];

              if (key === "email") {
                setEmailError(value);
              }

              if (key === "password") {
                setPasswordError(value);
              }
            });
          }
          return;
        }
        dispatch(
          setMessage({
            message: error,
            type: "error",
            showOn: "login",
          })
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const redirectIfAuthenticate = useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      router.push("/");
    }
  }, [router]);

  return {
    email,
    password,
    formData,
    showPassword,
    emailError,
    passwordError,
    isLoading,
    handleChange,
    togglePasswordVisibility,
    validateEmail,
    validatePassword,
    onSubmit,
  };
}
