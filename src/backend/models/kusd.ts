import { KUSD } from "../../types/kusd";

export class KUSDModel implements KUSD {
  constructor(
    private _username: KUSD["username"],
    private _title: KUSD["title"],
    private _firstName: KUSD["firstName"],
    private _lastName: KUSD["lastName"],
    private _email: KUSD["email"],
    private _isActive: KUSD["isActive"],
  ) {}

  public get username(): KUSD["username"] {
    return this._username;
  }

  public get title(): KUSD["title"] {
    return this._title;
  }

  public get firstName(): KUSD["firstName"] {
    return this._firstName;
  }

  public get lastName(): KUSD["lastName"] {
    return this._lastName;
  }

  public get email(): KUSD["email"] {
    return this._email;
  }

  public get isActive(): KUSD["isActive"] {
    return this._isActive;
  }
}
