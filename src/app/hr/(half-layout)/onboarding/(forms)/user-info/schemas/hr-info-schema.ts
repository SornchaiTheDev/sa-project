import { z } from "zod";

export const hrInfo = z.object({
  prefix: z.string().min(1, "กรุณาเลือกคำนำหน้า"),
  firstName: z.string().min(1, "กรุณากรอกชื่อ"),
  lastName: z.string().min(1, "กรุณากรอกนามสกุล"),
  phone: z
    .string()
    .min(9, "เบอร์ติดต่อต้องมีอย่างน้อย 9 หลัก")
    .max(10, "เบอร์ติดต่อต้องมีไม่เกิน 10 หลัก"),
});

export type HRInfo = z.infer<typeof hrInfo>;
