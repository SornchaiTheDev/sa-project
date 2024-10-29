import { query } from "~/lib/db";
import { Candidate } from "~/types/candidate";

export const getAllCandidates = async (
  announcementId: string,
): Promise<Candidate[]> => {
  const queryString = `SELECT "Title" AS title, 
                              "First_Name" AS "firstName",
                              "Last_Name" AS "lastName",
                              "Faculty" AS "faculty",
                              "Major" AS "major",
                              "GPAX" AS gpax, 
                              "Description" AS description, 
                              "Profile_Image" AS "profileImage"
                        FROM "STUDENT" S
                        JOIN "POSITION_REGISTER" P
                        ON S."Username" = P."STU_Username"
                        JOIN "USER" U
                        ON S."Username" = U."Username"
                        WHERE "JOB_Announce_ID" = $1;`;

  const res = await query(queryString, [announcementId]);
  return res.rows;
};

export const getNotVerifyCandidates = async (
  announcementId: string,
  position: string,
): Promise<Candidate[]> => {
  const queryString = `SELECT
          "Title" AS title,
          "First_Name" AS "firstName",
          "Last_Name" AS "lastName",
          "Faculty" AS "faculty",
          "Major" AS "major",
          "GPAX" AS gpax,
          "Description" AS description,
          "Profile_Image" AS "profileImage",
          "Is_STU_Confirm" AS "isStuConfirm"
      FROM
          "STUDENT" S
          JOIN "POSITION_REGISTER" P ON S."Username" = P."STU_Username"
          JOIN "USER" U ON S."Username" = U."Username"
          LEFT JOIN "STUDENT_TO_QUALIFICATION_ANNOUNCEMENT" STQA ON STQA."STU_Username" = S."Username"
      WHERE
          "JOB_Announce_ID" = $1 AND STQA."Is_STU_Confirm" IS NULL; AND "Job_Name" = $2`;
  const res = await query(queryString, [announcementId, position]);
  return res.rows;
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
