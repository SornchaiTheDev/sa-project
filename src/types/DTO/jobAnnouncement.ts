import type { StaticImageData } from "next/image";

export interface Position {
  id: string;
  announceId: string;
  name: string;
  jobMode: 0 | 1;
  earnings: string;
  amount: number;
  detail: string;
  qualification: string;
  welfare: string;
}

interface Address {
  place: string;
  province: string;
  amphur: string;
  tambon: string;
}

export interface JobAnnouncement {
  id: string;
  title: string;
  description: string;
  companyName: string;
  companyAddress: Address;
  companyImage: string | StaticImageData;
  positions: Position[];
  createdAt: string;
}
