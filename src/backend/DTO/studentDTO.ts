export interface CreateStudent {
  username: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UpdateStudent {
  prefix: string;
  firstName: string;
  surName: string;
  email: string;
  bod: Date;
  phone: string;
  faculty: string;
  major: string;
  gpax: string;
  activitiesHours: string;
  workExp: string;
}
