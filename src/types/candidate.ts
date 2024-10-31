export interface Candidate {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  faculty: string;
  major: string;
  gpax: number;
  description: string;
  profileImage: string;
  isStdConfirm: 0 | 1 | null;
  positionID: string;
  positionName: string;
  activityHours: Record<string, number>;
  phoneNumber: string;
}
