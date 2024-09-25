import { z } from "zod";

export const companyInfo = z
  .object({
    type: z
      .literal("government")
      .or(z.literal("private"))
      .or(z.literal("none")),
    name: z.string().min(1, "กรุณากรอกชื่อบริษัท"),
    taxId: z.string().optional(),
    category: z.string().min(1, "กรุณาเลือกหมวดบริษัท"),
    bookUrl: z.array(z.string()).optional(),
  })
  .refine((data) => data.type !== "none", {
    message: "กรุณาเลือกประเภทบริษัท",
    path: ["type"],
  })
  .refine(
    ({ type, taxId }) => {
      if (type === "government" && taxId?.length === 0) return false;
      return true;
    },
    { message: "กรุณากรอกเลขที่หนังสือ", path: ["taxId"] },
  )
  .refine(
    ({ type, bookUrl }) => {
      if (type === "government" && bookUrl?.length === 0) return false;
      return true;
    },
    { message: "กรุณาอัพโหลดหนังสือยื่นคำร้อง", path: ["bookUrl"] },
  );

export type CompanyInfo = z.infer<typeof companyInfo>;
