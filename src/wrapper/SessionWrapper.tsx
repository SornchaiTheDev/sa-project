"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect } from "react";
import { UserInfo } from "~/types/userInfo";

const SessionContext = createContext<UserInfo>({
  facultyId: "",
  sub: "",
  googleMail: "",
  preferredUsername: "",
  office365Mail: "",
  locale: "",
  faculty: "",
  uid: "",
  idCode: "",
  givenName: "",
  surname: "",
  thaiPrename: "",
  advisorId: "",
  lastName: "",
  majorId: "",
  emailVerified: false,
  campus: "",
  degree: "",
  cn: "",
  firstName: "",
  userPrincipalName: "",
  typePerson: "",
  thaiName: "",
  name: "",
  familyName: "",
});

export const useSession = () => useContext(SessionContext);

export default function SessionWrapper({
  children,
  userInfo,
}: {
  children: React.ReactNode;
  userInfo: UserInfo;
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

  return (
    <SessionContext.Provider value={{ ...userInfo }}>
      {children}
    </SessionContext.Provider>
  );
}
