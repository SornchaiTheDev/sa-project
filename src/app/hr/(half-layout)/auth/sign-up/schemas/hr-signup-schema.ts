import { z } from "zod";

export const hrSignUpSchema = z
  .object({
    email: z.string().email("กรุณากรอกอีเมลให้ถูกต้อง"),
    username: z
      .string()
      .min(1, "ชื่อผู้ใช้ต้องยาวอย่างน้อย 1 ตัวอักษร")
      .regex(/^[a-zA-Z_]+$/, "ชื่อผู้ใช้ต้องเป็นตัวอักษร A-Z และ _ เท่านั้น"),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/,
      ),
    confirmPassword: z.string(),
  })
  .refine((val) => val.confirmPassword === val.password, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

export type HRSignUpSchema = z.infer<typeof hrSignUpSchema>;
