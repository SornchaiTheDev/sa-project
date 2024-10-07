import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    KU_ALL_LOGIN_CLIENT_ID: z.string().min(1),
    KU_ALL_LOGIN_CLIENT_SECRET: z.string().min(1),
    KU_ALL_LOGIN_REDIRECT_URI: z.string().min(1),
    KU_ALL_LOGIN_AUTHORIZATION_URI: z.string().min(1),
    KU_ALL_LOGIN_SCOPE: z.string().min(1),
    KU_ALL_LOGIN_CODE_VERIFIER: z.string().min(1),
    KU_ALL_LOGIN_USER_INFO_URI: z.string().min(1),
    KU_ALL_LOGIN_TOKEN_ENDPOINT: z.string().min(1),
    KU_ALL_LOGIN_END_SESSION_ENDPOINT: z.string().min(1),
    WEB_URL: z.string().min(1),
    JWT_SECRET: z.string().min(1),
    JWT_REFRESH_SECRET: z.string().min(1),
  },

  /**
   * The prefix that client-side variables must have. This is enforced both at
   * a type-level and at runtime.
   */
  clientPrefix: "PUBLIC_",

  client: {},

  runtimeEnv: process.env,
});
