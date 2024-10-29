import { z } from "zod";
import { dayjs } from "~/lib";

const fromYear = dayjs().add(-25, "year");
const toYear = fromYear.add(10, "year");

const uploadedFile = z.object({
  id: z.string(),
  name: z.string(),
  objectName: z.string(),
  url: z.string(),
  size: z.number(),
  type: z.string(),
});

export const userInfo = z
  .object({
    title: z
      .string()
      .min(1, "กรุณาเลือกคำนำหน้า")
      .refine((val) => val !== "none", "กรุณาเลือกคำนำหน้า"),
    firstName: z.string().min(1, "กรุณากรอกชื่อ"),
    lastName: z.string().min(1, "กรุณากรอกนามสกุล"),
    email: z.string().email("กรุณากรอกอีเมลให้ถูกต้อง"),
    dateOfBirth: z
      .date()
      .refine(
        (val) => dayjs(val).isAfter(fromYear) && dayjs(val).isBefore(toYear),
        "กรุณากรอกวันเกิดให้ถูกต้อง",
      ),
    phoneNumber: z
      .string()
      .min(9, "เบอร์ติดต่อต้องมีอย่างน้อย 9 หลัก")
      .max(10, "เบอร์ติดต่อต้องมีไม่เกิน 10 หลัก")
      .regex(/^[0-9]{9,10}$/, "กรุณากรอกเบอร์ติดต่อให้ถูกต้อง"),
    profileImage: z.array(uploadedFile),
  })

  .refine((data) => data.profileImage.length === 1, {
    message: "กรุณาอัพโหลดหนังสือคำร้อง",
    path: ["bookUrl"],
  })
  .refine(
    (data) =>
      data.profileImage.length === 1 &&
      data.profileImage[0].size < 10 * 1024 * 1024,
    {
      message: "ขนาดไฟล์หนังสือคำร้องต้องไม่เกิน 10 MB",
      path: ["bookUrl"],
    },
  );

export type UserInfo = z.infer<typeof userInfo>;
