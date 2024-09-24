import { z } from "zod";

export const hrSignUpSchema = z
  .object({
    email: z.string().email("กรุณากรอกอีเมลให้ถูกต้อง"),
    username: z
      .string()
      .min(3, "ชื่อผู้ใช้ต้องยาวอย่างน้อย 3 ตัวอักษร")
      .max(20, "ชื่อผู้ใช้ยาวได้มากสุด 20 ตัวอักษร"),
    password: z.string().min(8, "รหัสผ่านต้องยาวอย่างน้อย 8 ตัวอักษร").max(100),
    confirmPassword: z
      .string()
      .min(8, "รหัสผ่านต้องยาวอย่างน้อย 8 ตัวอักษร")
      .max(100),
  })
  .refine((val) => val.confirmPassword === val.password, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

export type HRSignUpSchema = z.infer<typeof hrSignUpSchema>;
