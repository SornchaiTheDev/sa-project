import { cookies } from "next/headers";

export const setHTTPOnlyCookie = (name: string, value: string) => {
  cookies().set(name, value, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
};
