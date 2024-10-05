import { JobAnnouncer } from "../../types/jobAnnouncer";

export class JobAnnouncerModel implements JobAnnouncer {
  constructor(
    private _username: JobAnnouncer["username"],
    private _password: JobAnnouncer["password"],
    private _companyId: JobAnnouncer["companyId"],
    private _title: JobAnnouncer["title"],
    private _firstName: JobAnnouncer["firstName"],
    private _lastName: JobAnnouncer["lastName"],
    private _email: JobAnnouncer["email"],
    private _isActive: JobAnnouncer["isActive"],
    private _lastUpdate: JobAnnouncer["lastUpdate"],
    private _approveRequest: JobAnnouncer["approveRequest"],
    private _phoneNumber: JobAnnouncer["phoneNumber"]
  ) {}

  public get username(): JobAnnouncer["username"] {
    return this._username;
  }

  public get password(): JobAnnouncer["password"] {
    return this._password;
  }

  public get companyId(): JobAnnouncer["companyId"] {
    return this._companyId;
  }

  public get title(): JobAnnouncer["title"] {
    return this._title;
  }

  public get firstName(): JobAnnouncer["firstName"] {
    return this._firstName;
  }

  public get lastName(): JobAnnouncer["lastName"] {
    return this._lastName;
  }

  public get email(): JobAnnouncer["email"] {
    return this._email;
  }

  public get isActive(): JobAnnouncer["isActive"] {
    return this._isActive;
  }

  public get lastUpdate(): JobAnnouncer["lastUpdate"] {
    return this._lastUpdate;
  }

  public get approveRequest(): JobAnnouncer["approveRequest"] {
    return this._approveRequest;
  }

  public get phoneNumber(): JobAnnouncer["phoneNumber"] {
    return this._phoneNumber;
  }
}
