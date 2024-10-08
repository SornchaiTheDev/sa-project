import { z } from "zod";
import { dayjs } from "~/lib";

const fromYear = dayjs().add(-25, "year");
const toYear = fromYear.add(10, "year");

export const userInfo = z.object({
  prefix: z
    .string()
    .min(1, "กรุณาเลือกคำนำหน้า")
    .refine((val) => val !== "none", "กรุณาเลือกคำนำหน้า"),
  firstName: z.string().min(1, "กรุณากรอกชื่อ"),
  surName: z.string().min(1, "กรุณากรอกนามสกุล"),
  email: z.string().email("กรุณากรอกอีเมลให้ถูกต้อง"),
  bod: z
    .date()
    .refine(
      (val) => dayjs(val).isAfter(fromYear) && dayjs(val).isBefore(toYear),
      "กรุณากรอกวันเกิดให้ถูกต้อง",
    ),
  phone: z
    .string()
    .min(9, "เบอร์ติดต่อต้องมีอย่างน้อย 9 หลัก")
    .max(10, "เบอร์ติดต่อต้องมีไม่เกิน 10 หลัก")
    .regex(/^[0-9]{9,10}$/, "กรุณากรอกเบอร์ติดต่อให้ถูกต้อง"),
});

export type UserInfo = z.infer<typeof userInfo>;
