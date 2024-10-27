import type { StaticImageData } from "next/image";

interface Position {
  name: string;
  amount: number;
}

export interface JobAnnouncement {
  id: string;
  title: string;
  description: string;
  companyName: string;
  companyAddress: string;
  companyImage: string | StaticImageData;
  positions: Position[];
  createdAt: string;
}
