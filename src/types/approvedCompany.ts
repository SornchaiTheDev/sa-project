export interface ApprovedCompany {
  id: string;
  name: string;
  address: string;
  category: string;
  taxId: string | null;
  companyImage: string | null;
  requestedFile: string;
  isActive: boolean;
}
