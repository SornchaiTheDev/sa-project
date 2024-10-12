interface Position {
  name: string;
  type: "full-time" | "part-time";
  amount: number;
  salary: number;
  description: string;
  qualification: string;
  welfare: string;
}

export interface JobAnnouncementDTO {
  name: string;
  description: string;
  postions: Position[];
}