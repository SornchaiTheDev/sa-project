import { JobRecruitment } from "../../types/jobRecruitment";

export class JobRecruitmentModel implements JobRecruitment {
  constructor(
    private _id: JobRecruitment["id"],
    private _studentUsername: JobRecruitment["studentUsername"],
    private _jobAUsername: JobRecruitment["jobAUsername"],
    private _recruitPosition: JobRecruitment["recruitPosition"],
    private _startDate: JobRecruitment["startDate"],
    private _endDate: JobRecruitment["endDate"],
    private _dateTime: JobRecruitment["dateTime"]
  ) {}

  public get id(): JobRecruitment["id"] {
    return this._id;
  }

  public get studentUsername(): JobRecruitment["studentUsername"] {
    return this._studentUsername;
  }

  public get jobAUsername(): JobRecruitment["jobAUsername"] {
    return this._jobAUsername;
  }

  public get recruitPosition(): JobRecruitment["recruitPosition"] {
    return this._recruitPosition;
  }

  public get startDate(): JobRecruitment["startDate"] {
    return this._startDate;
  }

  public get endDate(): JobRecruitment["endDate"] {
    return this._endDate;
  }

  public get dateTime(): JobRecruitment["dateTime"] {
    return this._dateTime;
  }
}
