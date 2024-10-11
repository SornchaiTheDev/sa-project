import { JobAnnouncer } from "~/types/jobAnnouncer";

export type JobAnnouncerDTO = Omit<
  JobAnnouncer,
  "isActive" | "lastUpdate" | "approveRequest"
>;
