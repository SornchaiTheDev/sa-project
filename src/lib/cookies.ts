import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export const setHTTPOnlyCookie = (
  name: string,
  value: string,
  options?: Partial<ResponseCookie>,
) => {
  cookies().set(name, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    ...options,
  });
};
