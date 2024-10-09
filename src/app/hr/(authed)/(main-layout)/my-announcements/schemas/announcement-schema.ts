import { z } from "zod";

const positionSchema = z.object({
  name: z.string().min(1, "กรุณากรอกชื่อตำแหน่ง"),
  type: z
    .literal("full-time")
    .or(z.literal("part-time"))
    .or(z.literal("internship")),
  amount: z
    .string()
    .min(1, "กรุณากรอกจำนวนรับสมัคร")
    .regex(/^[0-9]*$/, {
      message: "กรุณากรอกจำนวนรับสมัครเป็นตัวเลขเท่านั้น",
    }),
  salary: z
    .string()
    .min(1, "กรุณากรอกรายได้")
    .regex(/^[0-9]*$/, {
      message: "กรุณากรอกจำนวนรับสมัครเป็นตัวเลขเท่านั้น",
    }),
  description: z.string().min(1, "กรุณากรอกคำอธิบาย"),
  qualification: z.string().min(1, "กรุณากรอกคุณสมบัติ"),
  welfare: z.string().optional(),
});
export const announcementSchema = z.object({
  name: z.string().min(1, "กรุณากรอกชื่อประกาศ"),
  position: z.array(positionSchema),
});

export type Announcement = z.infer<typeof announcementSchema>;
