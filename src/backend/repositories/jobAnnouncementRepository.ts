import { query } from "~/lib/db";
import { JobAnnouncementDTO } from "../DTO/jobAnnouncementDTO";

export class JobAnnouncementRepository {
  public async countMissingAnnouncement(recentJobAID: string): Promise<number> {
    const text = `SELECT COUNT(*) AS MissingCount
                  FROM "RELATION_RECEIVE_QUALIFICATION
                  WHERE "Qualify_Announce_ID" IN
                  (SELECT "Qualify_Announce_ID" FROM "JOB_ANNOUNCEMENT"
                  WHERE "Job_Announce_ID" = $1) AND
                  Is_Student_Confirm = 0
    `;

    const values = [recentJobAID];

    const res = await query(text, values);

    if (res.length === 0) {
      return 0;
    }
    return res[0]["MissingCount"];
  }

  public async getRecentJobAID(jobAID: string): Promise<string | null> {
    const text = `SELECT "Job_Announce_ID" AS ID
                  FROM "JOB_ANNOUNCEMENT"
                  WHERE "JOBA_Username" = $1
                  ORDER BY "Job_Announce_Date_Time" 
                  DESC LIMIT 1
    `;

    const values = [jobAID];

    const res = await query(text, values);

    if (res.length === 0) {
      return null;
    }
    return res[0]["ID"];
  }
  public async create(
    jobA: JobAnnouncementDTO,
    jobAUsername: string,
  ): Promise<void> {
    const createJobAnnouncement = `
      INSERT INTO "JOB_ANNOUNCEMENT" (
      "JOBA_Username",
      "Job_Announce_Date_Time",
      "Job_Announce_Title",
      "Job_Announce_Description"
      )
      VALUES ($1, CURRENT_TIMESTAMP, $2, $3)
      RETURING "Job_Announce_ID"
    `;

    const values: string[] = [jobAUsername, jobA.name, jobA.description];

    const jobAnnouncementRes = await query(createJobAnnouncement, values);
    const jobAnnouncementID = jobAnnouncementRes[0]["Job_Announce_ID"];

    const createPositionText = `
      INSERT INTO "POSITION" (
      "Job_Announce_ID",
      "Job_Mode",
      "Position_Name",
      "Position_Amount",
      "Job_Position_Detail",
      "Job_Position_Qualifications",
      "Job_Position_Welfare"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
`;

    for (const positin of jobA.postions) {
      const values: string[] = [
        jobAnnouncementID,
        positin.type === "full-time" ? 1 : 0,
        positin.name,
        positin.amount,
        positin.description,
        positin.qualification,
        positin.welfare,
      ];

      await query(createPositionText, values);
    }
  }
}
