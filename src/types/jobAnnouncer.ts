export interface JobAnnouncer {
  username: string;
  password: string;
  companyId: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string | null;
  isActive: boolean;
  lastUpdate: Date | null;
  approveRequest: Date | null;
  phoneNumber: string | null;
}
