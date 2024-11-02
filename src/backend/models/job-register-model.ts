import dayjs from "dayjs";
import { query } from "~/lib/db";
import { Candidate } from "~/types/candidate";

export const getAllCandidates = async (
  announcementId: string,
  position: string,
): Promise<Candidate[]> => {
  const queryString = `SELECT   
                              S."Username" AS id,
                              "Title" AS title, 
                              "First_Name" AS "firstName",
                              "Last_Name" AS "lastName",
                              "Faculty" AS "faculty",
                              "Major" AS "major",
                              "GPAX" AS gpax, 
                              "Description" AS description, 
                              "Profile_Image" AS "profileImage",
                              P."Position_ID" AS "positionID",
                              STQA."Is_STU_Confirm" AS "isStdConfirm",
                              P."Job_Name" AS "positionName",
                              U."Phone_Number" AS "phoneNumber",
                              S."Activity_Hours" AS "activityHours"

FROM "STUDENT" S
JOIN "USER" U ON U."Username" = S."Username"
JOIN "POSITION_REGISTER" PR ON S."Username" = PR."STU_Username"
JOIN "POSITION" P ON P."Position_ID" = PR."Position_ID"
LEFT JOIN "JOB_RECRUITMENT" JR ON JR."Position_ID" = PR."Position_ID" AND S."Username" = PR."STU_Username"
LEFT JOIN "STUDENT_TO_QUALIFICATION_ANNOUNCEMENT" STQA ON STQA."STU_Username" = S."Username" AND JR."Job_Recruit_ID" = STQA."Job_Recruit_ID"
WHERE JR."Job_Recruit_ID" IS NOT NULL
AND PR."JOB_Announce_ID" = $1 AND P."Job_Name" LIKE $2`;

  const res = await query(queryString, [announcementId, `%${position}%`]);
  return res.rows;
};

export const getNotVerifyCandidates = async (
  announcementId: string,
  position: string,
): Promise<Candidate[]> => {
  const queryString = `SELECT   
    S."Username" AS id,
    "Title" AS title,
    "First_Name" AS "firstName",
    "Last_Name" AS "lastName",
    "Faculty" AS "faculty",
    "Major" AS "major",
    "GPAX" AS gpax,
    "Description" AS description,
    "Profile_Image" AS "profileImage",
    -1 AS "isStuConfirm",
    P."Position_ID" AS "positionID",
    P."Job_Name" AS "positionName"

FROM "STUDENT" S
JOIN "USER" U ON U."Username" = S."Username"
JOIN "POSITION_REGISTER" PR ON S."Username" = PR."STU_Username"
JOIN "POSITION" P ON P."Position_ID" = PR."Position_ID"
LEFT JOIN "JOB_RECRUITMENT" JR ON JR."Position_ID" = PR."Position_ID" AND S."Username" = PR."STU_Username"
WHERE JR."Job_Recruit_ID" IS NULL
AND PR."JOB_Announce_ID" = $1 AND P."Job_Name" LIKE $2`;
  const res = await query(queryString, [announcementId, `%${position}%`]);
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

interface AcceptCandidate {
  stdUsername: string;
  jobAnnounceId: string;
  companyId: string;
  positionId: string;
  jobAUsername: string;
  qualifyResult: 0 | 1;
}
export const notifyCandidate = async (payload: AcceptCandidate) => {
  const {
    stdUsername,
    jobAUsername,
    jobAnnounceId,
    companyId,
    positionId,
    qualifyResult,
  } = payload;

  const createRecruitString = `INSERT INTO
    "JOB_RECRUITMENT" (
        "JOBA_Username",
        "Position_ID",
        "STU_Username",
        "JOB_Announce_ID",
        "Company_ID"
    )
VALUES
    ($1, $2, $3, $4, $5) RETURNING "Job_Recruit_ID" AS id;`;

  try {
    await query("BEGIN");
    const createRecruitRes = await query(createRecruitString, [
      jobAUsername,
      positionId,
      stdUsername,
      jobAnnounceId,
      companyId,
    ]);

    const jobRecruitId = createRecruitRes.rows[0].id;

    const announceString = `INSERT INTO
    "STUDENT_TO_QUALIFICATION_ANNOUNCEMENT"(
        "STU_Username",
        "Qualify_Result",
        "Qualification_Expired_Date_Time",
        "Job_Recruit_ID"
    )
VALUES
    ($1, $2, $3, $4);`;

    const expiredDate = dayjs().add(7, "day").toDate();

    await query(announceString, [
      stdUsername,
      qualifyResult,
      expiredDate,
      jobRecruitId,
    ]);

    await query("COMMIT");
  } catch (err) {
    await query("ROLLBACK");
    throw err;
  }
};

export const confirmJob = async (id: string, status: number) => {
  const queryString = `UPDATE "STUDENT_TO_QUALIFICATION_ANNOUNCEMENT" SET "Is_STU_Confirm" = $1 WHERE "Qualification_Announce_ID" = $2`;

  await query(queryString, [status, id]);
};
