import { z } from "zod";

export const userInfo = z.object({
  prefix: z.string().min(1, "กรุณาเลือกคำนำหน้า"),
  firstName: z.string().min(1, "กรุณากรอกชื่อ"),
  lastName: z.string().min(1, "กรุณากรอกนามสกุล"),
  email: z.string().email("กรุณากรอกอีเมลให้ถูกต้อง"),
  bod: z.date(),
  phone: z.string().min(9,"เบอร์ติดต่อต้องมีอย่างน้อย 9 หลัก").max(10,"เบอร์ติดต่อต้องมีไม่เกิน 10 หลัก"),
});

export type UserInfo = z.infer<typeof userInfo>;
