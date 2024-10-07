"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function SessionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const refreshToken = useCallback(async () => {
    try {
      await axios.post("/api/auth/refresh-token");
    } catch (err) {
      if (err instanceof AxiosError) {
        switch (err.response?.data.message) {
          case "TOKEN_NOT_FOUND":
          case "TOKEN_EXPIRED":
            router.push("/auth/sign-in");
            break;
        }
      }
    }
  }, [router]);

  useEffect(() => {
    const minutes = 1000 * 60 * 1;

    const interval = setInterval(async () => {
      await refreshToken();
    }, 1 * minutes);

    window.addEventListener("focus", refreshToken);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", refreshToken);
    };
  }, [refreshToken]);
  return children;
}
