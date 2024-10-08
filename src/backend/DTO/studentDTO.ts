export interface CreateStudent {
  username: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  faculty: string;
}

export interface UpdateStudent {
  username: string;
  bod: Date;
  phone: string;
  major: string;
  gpax: string;
  activitiesHours: string;
  workExp: string;
}
