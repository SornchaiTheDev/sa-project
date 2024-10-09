"use client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useCallback, useEffect } from "react";
import { HRInfo } from "~/types/hrInfo";

const HRSessionContext = createContext<HRInfo>({
  username: "",
  title: "",
  firstName: "",
  lastName: "",
  isActive: false,
  companyId: "",
  phoneNumber: "",
});

function HRSessionWrapper({
  children,
  hrInfo,
}: {
  children: ReactNode;
  hrInfo: HRInfo;
}) {
  const router = useRouter();
  const refreshToken = useCallback(async () => {
    try {
      await axios.post("/api/auth/refresh-token");
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err);
        switch (err.response?.data.message) {
          case "UNAUTHORIZED":
          case "TOKEN_NOT_FOUND":
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
  return (
    <HRSessionContext.Provider value={hrInfo}>
      {children}
    </HRSessionContext.Provider>
  );
}

export default HRSessionWrapper;
