import { createEnv } from "@t3-oss/env-core";
import { z, ZodError } from "zod";
import dotenv from "dotenv";

dotenv.config();

export const env = createEnv({
  skipValidation: true,
  onValidationError: (error: ZodError) => {
    console.error(
      "❌ Invalid environment variables:",
      error.flatten().fieldErrors,
    );
    throw new Error("Invalid environment variables");
  },
  // Called when server variables are accessed on the client.
  onInvalidAccess: (variable: string) => {
    throw new Error(
      "❌ Attempted to access a server-side environment variable on the client",
    );
  },
  server: {
    KU_ALL_LOGIN_CLIENT_ID: z.string().min(1),
    KU_ALL_LOGIN_CLIENT_SECRET: z.string().min(1),
    KU_ALL_LOGIN_REDIRECT_URI: z.string().min(1),
    KU_ALL_LOGIN_SCOPE: z.string().min(1),
    KU_ALL_LOGIN_CODE_VERIFIER: z.string().min(1),
    WEB_URL: z.string().min(1),
    JWT_SECRET: z.string().min(1),
    JWT_REFRESH_SECRET: z.string().min(1),
    POSTGRES_USER: z.string().min(1),
    POSTGRES_PASSWORD: z.string().min(1),
    POSTGRES_DB: z.string().min(1),
    POSTGRES_HOST: z.string().min(1),
    POSTGRES_PORT: z.string().min(1).default("5432"),
    MINIO_ACCESS_KEY: z.string().min(1),
    MINIO_SECRET_KEY: z.string().min(1),
    MINIO_SSL: z.string().min(1).default("false"),
    MINIO_ENDPOINT: z.string().min(1),
    MINIO_PORT: z.string().min(1).default("9000"),
  },

  /**
   * The prefix that client-side variables must have. This is enforced both at
   * a type-level and at runtime.
   */
  clientPrefix: "PUBLIC_",

  client: {},

  runtimeEnvStrict: {
    WEB_URL: process.env.WEB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
    KU_ALL_LOGIN_SCOPE: process.env.KU_ALL_LOGIN_SCOPE,
    KU_ALL_LOGIN_CLIENT_ID: process.env.KU_ALL_LOGIN_CLIENT_ID,
    KU_ALL_LOGIN_REDIRECT_URI: process.env.KU_ALL_LOGIN_REDIRECT_URI,
    KU_ALL_LOGIN_CLIENT_SECRET: process.env.KU_ALL_LOGIN_CLIENT_SECRET,
    KU_ALL_LOGIN_CODE_VERIFIER: process.env.KU_ALL_LOGIN_CODE_VERIFIER,
    MINIO_ENDPOINT: process.env.MINIO_ENDPOINT,
    MINIO_PORT: process.env.MINIO_PORT,
    MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY,
    MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY,
    MINIO_SSL: process.env.MINIO_SSL,
  },
});
