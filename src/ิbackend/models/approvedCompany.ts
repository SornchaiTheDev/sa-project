import { ApprovedCompany } from "../../types/approvedCompany";

export class ApproveCompanyModel implements ApprovedCompany {
  constructor(
    private _id: ApprovedCompany["id"],
    private _name: ApprovedCompany["name"],
    private _address: ApprovedCompany["address"],
    private _taxId: ApprovedCompany["taxId"],
    private _requestedFile: ApprovedCompany["requestedFile"],
    private _isActive: ApprovedCompany["isActive"]
  ) { }

  public get id(): ApprovedCompany["id"] {
    return this._id;
  }

  public get name(): ApprovedCompany["name"] {
    return this._name;
  }

  public get address(): ApprovedCompany["address"] {
    return this._address;
  }

  public get taxId(): ApprovedCompany["taxId"] {
    return this._taxId;
  }

  public get requestedFile(): ApprovedCompany["requestedFile"] {
    return this._requestedFile;
  }

  public get isActive(): ApprovedCompany["isActive"] {
    return this._isActive;
  }
}
