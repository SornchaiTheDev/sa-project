"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect } from "react";
import { UserInfo } from "~/types/userInfo";

const AllLoginSessionContext = createContext<UserInfo>({
  facultyId: "",
  sub: "",
  googleMail: "",
  preferredUsername: "",
  office365Mail: "",
  locale: "",
  faculty: "",
  uid: "",
  idCode: "",
  thaiPreName: "",
  thFirstName: "",
  thSurName: "",
  thFullName: "",
  enFirstName: "",
  enSurName: "",
  enFullName: "",
  advisorId: "",
  lastName: "",
  majorId: "",
  emailVerified: false,
  campus: "",
  degree: "",
  cn: "",
  userPrincipalName: "",
  typePerson: "",
});

export const useAllLoginSession = () => useContext(AllLoginSessionContext);

export default function AllLoginSessionWrapper({
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
    <AllLoginSessionContext.Provider value={{ ...userInfo }}>
      {children}
    </AllLoginSessionContext.Provider>
  );
}
