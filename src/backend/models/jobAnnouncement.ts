import { JobAnnouncement } from "../../types/jobAnnouncement";

export class JobAnnouncementModel implements JobAnnouncement {
  constructor(
    private _id: JobAnnouncement["id"],
    private _jobAUsername: JobAnnouncement["jobAUsername"],
    private _dateTime: JobAnnouncement["dateTime"],
    private _title: JobAnnouncement["title"],
    private _description: JobAnnouncement["description"],
    private _quaifyAnnounceId: JobAnnouncement["quaifyAnnounceId"]
  ) {}

  public get id(): JobAnnouncement["id"] {
    return this._id;
  }

  public get jobAUsername(): JobAnnouncement["jobAUsername"] {
    return this._jobAUsername;
  }

  public get dateTime(): JobAnnouncement["dateTime"] {
    return this._dateTime;
  }

  public get title(): JobAnnouncement["title"] {
    return this._title;
  }

  public get description(): JobAnnouncement["description"] {
    return this._description;
  }

  public get quaifyAnnounceId(): JobAnnouncement["quaifyAnnounceId"] {
    return this._quaifyAnnounceId;
  }
}
