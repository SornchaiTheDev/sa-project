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
