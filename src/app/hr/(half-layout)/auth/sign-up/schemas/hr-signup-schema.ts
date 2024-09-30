import { z } from "zod";

export const hrSignUpSchema = z
  .object({
    email: z.string().email("กรุณากรอกอีเมลให้ถูกต้อง"),
    username: z
      .string()
      .min(1, "ชื่อผู้ใช้ต้องยาวอย่างน้อย 1 ตัวอักษร")
      .max(30, "ชื่อผู้ใช้ต้องยาวไม่เกิน 30 ตัวอักษร"),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      ),
    confirmPassword: z.string(),
  })
  .refine((val) => val.confirmPassword === val.password, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

export type HRSignUpSchema = z.infer<typeof hrSignUpSchema>;
