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
  address: string;
  bookUrl: UploadedFile[];
  logoUrl: UploadedFile[];
  category: string;
  isVerified: boolean;
}
