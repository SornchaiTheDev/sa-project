import { query } from "~/lib/db";

export const getPositionsByJobAnnouncementID = async (
  jobAnnouncementId: string,
) => {
  const positionQueryString = `SELECT "Position_ID" AS "id",
                                      "Job_Name" AS "name",
                                      "Job_Mode" AS "jobMode",
                                      "Job_Earnings" AS "earnings",
                                      "Job_Amount" AS "amount",
                                      "Job_Position_Detail" AS "detail",
                                      "Job_Position_Qualifications" AS "qualification",
                                      "Job_Position_Welfare" AS "welfare"
                                FROM "POSITION"
                                WHERE "JOB_Announce_ID" = $1`;

  const positionRes = await query(positionQueryString, [jobAnnouncementId]);

  return positionRes.rows;
};
