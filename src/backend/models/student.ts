import { Student } from "../../types/student";

export class StudentModel implements Student {
  constructor(
    private _username: Student["username"],
    private _title: Student["title"],
    private _firstName: Student["firstName"],
    private _lastName: Student["lastName"],
    private _email: Student["email"],
    private _isActive: Student["isActive"],
    private _activityHours: Student["activityHours"],
    private _phoneNumber: Student["phoneNumber"],
    private _description: Student["description"],
    private _gpax: Student["gpax"]
  ) {}

  public get username(): Student["username"] {
    return this._username;
  }

  public get title(): Student["title"] {
    return this._title;
  }

  public get firstName(): Student["firstName"] {
    return this._firstName;
  }

  public get lastName(): Student["lastName"] {
    return this._lastName;
  }

  public get email(): Student["email"] {
    return this._email;
  }

  public get isActive(): Student["isActive"] {
    return this._isActive;
  }

  public get activityHours(): Student["activityHours"] {
    return this._activityHours;
  }

  public get phoneNumber(): Student["phoneNumber"] {
    return this._phoneNumber;
  }

  public get description(): Student["description"] {
    return this._description;
  }

  public get gpax(): Student["gpax"] {
    return this._gpax;
  }
}
