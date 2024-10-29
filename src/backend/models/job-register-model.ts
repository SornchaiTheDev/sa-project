import { query } from "~/lib/db";

export const getAllRegisterdJobs = async () => {
  const queryString = `SELECT `;
};

export interface EnrollToPosition {
  username: string;
  positionIds: string[];
  jobAnnounceId: string;
}

export const isAlreadyEnrolled = async (
  username: string,
  jobAnnounceId: string,
) => {
  const queryString = `SELECT * FROM "POSITION_REGISTER" WHERE "STU_Username" = $1 AND "JOB_Announce_ID" = $2`;

  const res = await query(queryString, [username, jobAnnounceId]);

  return res.rows.length > 0;
};

export const enrollToPosition = async (payload: EnrollToPosition) => {
  const { username, positionIds, jobAnnounceId } = payload;
  for (const positionId of positionIds) {
    const queryString = `INSERT INTO "POSITION_REGISTER" (
                                   "STU_Username",
                                   "Position_ID",
                                   "JOB_Announce_ID"
                        ) VALUES ($1,$2,$3)`;

    await query(queryString, [username, positionId, jobAnnounceId]);
  }
};
