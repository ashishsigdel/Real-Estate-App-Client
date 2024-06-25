"use client";
import { setAuth } from "@/redux/features/authSlice";
import { setMessage } from "@/redux/features/popupMessageSlice";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AuthHandler = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const handleAuth = useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user") ?? "{}");
    if (accessToken && user) {
      dispatch(setAuth(user));
      if (pathname === "/login" || pathname === "/register") {
        router.push("/");
      }
    }

    if (!accessToken) {
      if (pathname.includes("profile") && pathname !== "/login") {
        router.push("/login");
        dispatch(
          setMessage({
            message: "Please Login first!",
            type: "error",
            showOn: "login",
          })
        );
      }
    }
  }, [dispatch, pathname, router]);
  return { handleAuth };
};

export default AuthHandler;
