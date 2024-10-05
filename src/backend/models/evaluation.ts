import { Evaluation } from "../../types/evaluation";

export class EvaluationModel implements Evaluation {
  constructor(
    private _id: Evaluation["id"],
    private _studentUsername: Evaluation["studentUsername"],
    private _jobAUsername: Evaluation["jobAUsername"],
    private _result: Evaluation["result"],
    private _dateTime: Evaluation["dateTime"],
    private _positionId: Evaluation["positionId"]
  ) {}

  public get id(): Evaluation["id"] {
    return this._id;
  }

  public get studentUsername(): Evaluation["studentUsername"] {
    return this._studentUsername;
  }

  public get jobAUsername(): Evaluation["jobAUsername"] {
    return this._jobAUsername;
  }

  public get result(): Evaluation["result"] {
    return this._result;
  }

  public get dateTime(): Evaluation["dateTime"] {
    return this._dateTime;
  }

  public get positionId(): Evaluation["positionId"] {
    return this._positionId;
  }
}
