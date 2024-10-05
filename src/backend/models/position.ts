import { Position } from "../../types/position";

export class PositionModel implements Position {
  constructor(
    private _id: Position["id"],
    private _announceId: Position["announceId"],
    private _jobMode: Position["jobMode"],
    private _name: Position["name"],
    private _amount: Position["amount"],
    private _detail: Position["detail"],
    private _qualificationDetail: Position["qualificationDetail"],
    private _welfare: Position["welfare"],
    private _studentUsername: Position["studentUsername"]
  ) {}

  public get id(): Position["id"] {
    return this._id;
  }

  public get announceId(): Position["announceId"] {
    return this._announceId;
  }

  public get jobMode(): Position["jobMode"] {
    return this._jobMode;
  }

  public get name(): Position["name"] {
    return this._name;
  }

  public get amount(): Position["amount"] {
    return this._amount;
  }

  public get detail(): Position["detail"] {
    return this._detail;
  }

  public get qualificationDetail(): Position["qualificationDetail"] {
    return this._qualificationDetail;
  }

  public get welfare(): Position["welfare"] {
    return this._welfare;
  }

  public get studentUsername(): Position["studentUsername"] {
    return this._studentUsername;
  }
}
