import { query } from "~/lib/db";

export const getRecentJobAnnouncement = async (companyId: string) => {
  const recentJobAnnouncementQuery = `SELECT "Job_Announce_ID" AS ID
                  FROM "JOB_ANNOUNCEMENT"
                  WHERE "JOBA_Username" = $1
                  ORDER BY "Job_Announce_Date_Time"
                  DESC LIMIT 1`;

  const res = await query(recentJobAnnouncementQuery, [companyId]);

  return res.rows[0].id;
};
