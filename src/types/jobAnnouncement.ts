interface Position {
  name: string;
  amount: number;
}

export interface JobAnnouncement {
  id: string;
  companyName: string;
  companyImage: string;
  title: string;
  positions: Position[];
  description: string;
  createdAt: string;
}
