import { z } from "zod";

export const educationAndWorks = z.object({
  faculty: z
    .string()
    .min(1, "กรุณาเลือกคณะ")
    .refine((val) => val !== "none", "กรุณาเลือกคณะ"),
  major: z.string().min(1, "กรุณาเลือกสาขา"),
  gpax: z.string().min(1, "กรุณากรอกเกรดเฉลี่ยสะสม"),
  activitiesHours: z.string().min(1, "กรุณากรอกจำนวนชั่วโมงกจกรรม"),
  workExp: z.string(),
});

export type EducationAndWorks = z.infer<typeof educationAndWorks>;
