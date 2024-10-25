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
  lastName: string;
  phone: string;
  taxId: string;
  name: string;
  place: string;
  province: string;
  amphur: string;
  tambon: string;
  bookUrl: UploadedFile[];
  logoUrl: UploadedFile[];
  category: string;
  isVerified: boolean;
}
