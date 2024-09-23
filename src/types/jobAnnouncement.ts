import type { StaticImageData } from "next/image";

interface Position {
  name: string;
  amount: number;
}

export interface JobAnnouncement {
  id: string;
  companyName: string;
  companyImage: string | StaticImageData;
  title: string;
  positions: Position[];
  description: string;
  createdAt: string;
}
