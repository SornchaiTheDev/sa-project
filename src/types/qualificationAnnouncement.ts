export interface QualificationAnnouncement {
  id: string;
  jobAUsername: string;
  result: "Pass" | "Not Pass" | null;
  dateTime: Date;
}
