import { QualificationAnnouncement } from "../../types/qualificationAnnouncement";

export class QualificationAnnouncementModel implements QualificationAnnouncement {
  constructor(
    private _id: QualificationAnnouncement["id"],
    private _jobAUsername: QualificationAnnouncement["jobAUsername"],
    private _result: QualificationAnnouncement["result"],
    private _dateTime: QualificationAnnouncement["dateTime"]
  ) {}

  public get id(): QualificationAnnouncement["id"] {
    return this._id;
  }

  public get jobAUsername(): QualificationAnnouncement["jobAUsername"] {
    return this._jobAUsername;
  }

  public get result(): QualificationAnnouncement["result"] {
    return this._result;
  }

  public get dateTime(): QualificationAnnouncement["dateTime"] {
    return this._dateTime;
  }
}
