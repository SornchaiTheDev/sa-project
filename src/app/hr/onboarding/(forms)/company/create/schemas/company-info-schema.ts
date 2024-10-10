import { z } from "zod";

const assertThaiId = (thaiId: string): boolean => {
  const m = thaiId.match(/(\d{12})(\d)/);
  if (!m) {
    return false;
  }
  const digits = m[1].split("");
  const sum = digits.reduce((total: number, digit: string, i: number) => {
    return total + (13 - i) * +digit;
  }, 0);
  const lastDigit = `${(11 - (sum % 11)) % 10}`;
  const inputLastDigit = m[2];
  if (lastDigit !== inputLastDigit) {
    return false;
  }
  return true;
};

const uploadedFile = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  size: z.number(),
  type: z.string(),
});

export const companyInfo = z
  .object({
    type: z
      .literal("government")
      .or(z.literal("private"))
      .or(z.literal("none")),
    name: z.string().min(1, "กรุณากรอกชื่อบริษัท"),
    taxId: z
      .string()
      .refine(
        (val) => assertThaiId(val),
        "กรุณากรอกเลขประจำตัวผู้เสียภาษี 13 หลักให้ถูกต้อง",
      ),
    category: z.string().min(1, "กรุณาเลือกหมวดบริษัท"),
    logoUrl: z.array(uploadedFile),
    bookUrl: z.array(uploadedFile),
  })
  .refine((data) => data.type !== "none", {
    message: "กรุณาเลือกประเภทบริษัท",
    path: ["type"],
  })
  .refine((data) => data.bookUrl.length === 1, {
    message: "กรุณาอัพโหลดหนังสือคำร้อง",
    path: ["bookUrl"],
  })
  .refine((data) => data.bookUrl[0].size < 10 * 1024 * 1024, {
    message: "ขนาดไฟล์หนังสือคำร้องต้องไม่เกิน 10 MB",
    path: ["bookUrl"],
  })
  .refine((data) => data.logoUrl.length === 1, {
    message: "กรุณาอัพโหลดสัญลักษณ์หน่วยงาน",
    path: ["logoUrl"],
  })
  .refine((data) => data.logoUrl[0].size < 10 * 1024 * 1024, {
    message: "ขนาดไฟล์สัญลักษณ์หน่วยงานต้องไม่เกิน 10 MB",
    path: ["logoUrl"],
  });

export type CompanyInfo = z.infer<typeof companyInfo>;
