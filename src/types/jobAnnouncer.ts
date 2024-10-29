import { User } from "./user";

export interface JobAnnouncer {
  username: string;
  password: string;
  companyId: string;
  lastUpdateDate: Date;
  approveRequestDate: Date | null;
  validatedDate: Date | null;
}

export type JobAnnouncerWithUser = JobAnnouncer & User;

export type ConnectJobAWithCompany = Omit<
  JobAnnouncerWithUser,
  "lastUpdateDate" | "approveRequestDate" | "validatedDate" | "isActive"
>;
