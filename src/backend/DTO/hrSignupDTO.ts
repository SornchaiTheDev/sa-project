interface UploadedFile {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
}

export interface HRSignUpDTO {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  title: string;
  firstName: string;
  surName: string;
  phone: string;
  taxId: string;
  name: string;
  type: "government" | "private" | "none";
  bookUrl: UploadedFile[];
  logoUrl: UploadedFile[];
  category: string;
}
