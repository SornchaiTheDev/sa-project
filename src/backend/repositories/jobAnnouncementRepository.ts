import { query } from "~/lib/db";
import {
  JobAnnouncementDTO,
  JobAnnouncementPreview,
} from "../DTO/jobAnnouncementDTO";

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
    companyId: string,
  ): Promise<void> {
    const createJobAnnouncement = `
      INSERT INTO "JOB_ANNOUNCEMENT" (
      "JOBA_Username",
      "Company_ID",
      "Job_Announce_Date_Time",
      "Job_Announce_Title",
      "Job_Announce_Description"
      )
      VALUES ($1, $2, CURRENT_TIMESTAMP, $3, $4)
      RETURNING "Job_Announce_ID"
    `;

    const values: string[] = [
      jobAUsername,
      companyId,
      jobA.name,
      jobA.description,
    ];

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

    for (const position of jobA.positions) {
      const values: string[] = [
        jobAnnouncementID,
        position.type === "full-time" ? 0 : 1,
        position.name,
        position.amount,
        position.description,
        position.qualification,
        position.welfare,
      ];

      await query(createPositionText, values);
    }
  }

  public async getAllJobAnnouncementByCompanyID(
    companyId: string,
    search?: string,
  ): Promise<JobAnnouncementPreview[]> {
    const text = `
SELECT "Job_Announce_ID" AS id, "Job_Announce_Title" as title
FROM "JOB_ANNOUNCEMENT"
WHERE "Company_ID" = $1 AND "Job_Announce_Title" LIKE $2
`;
    const res = await query(text, [companyId, `%${search}%`]);
    return res.map((row) => ({ id: row["id"], name: row["title"] }));
  }
}
