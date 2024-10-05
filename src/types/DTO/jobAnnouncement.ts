import type { StaticImageData } from "next/image";
import { Position } from "../position";

export interface JobAnnouncement {
  id: string;
  companyName: string;
  companyImage: string | StaticImageData;
  title: string;
  positions: Position[];
  description: string;
  createdAt: string;
}
