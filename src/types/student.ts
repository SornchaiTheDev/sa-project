export enum IsActive {
  ACTIVE = 1,
  INACTIVE = 0,
}

export interface Student {
  username: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: IsActive;
  activityHours: JSON | null;
  phoneNumber: string | null;
  description: string | null;
  gpax: string | null;
}
