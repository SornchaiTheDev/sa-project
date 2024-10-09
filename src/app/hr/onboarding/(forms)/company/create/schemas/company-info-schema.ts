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
        "กรุณากรอกเลขประจำตัวผู้เสียภาษี 13 หลัก",
      ),
    category: z.string().min(1, "กรุณาเลือกหมวดบริษัท"),
    bookUrl: z.array(z.string()),
  })
  .refine((data) => data.type !== "none", {
    message: "กรุณาเลือกประเภทบริษัท",
    path: ["type"],
  })
  .refine((data) => data.bookUrl.length === 1, {
    message: "กรุณาอัพโหลดหนังสือคำร้อง",
    path: ["bookUrl"],
  });

export type CompanyInfo = z.infer<typeof companyInfo>;
