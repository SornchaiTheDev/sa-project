import { query } from "~/lib/db";
import { hashPassword } from "../libs/bcrypt";
import { JobAnnouncer, JobAnnouncerWithUser } from "~/types/jobAnnouncer";

interface CreateJobA {
  username: string;
  companyId: string;
  password: string;
}

export const createJobA = async (payload: CreateJobA) => {
  const { companyId, password, username } = payload;
  const hashedPassword = await hashPassword(password);

  const queryString = `INSERT INTO "JOB_ANNOUNCER" (
                                 "Username",
                                 "Company_ID",
                                 "Password", 
                                 "Last_Update_Date"
                     ) VALUES (
                              $1,
                              $2,
                              $3,
                              CURRENT_TIMESTAMP
                     )`;

  await query(queryString, [username, companyId, hashedPassword]);
};

export const getJobAByUsername = async (
  username: string,
): Promise<JobAnnouncer | null> => {
  const queryString = `SELECT
                          "Username" AS "username",
                          "Company_ID" AS "companyId",
                          "Password" AS "password",
                          "Last_Update_Date" AS "lastUpdateDate",
                          "Approve_Request_Date" AS "approveRequestDate"
                       FROM "JOB_ANNOUNCER"
                       WHERE "Username" = $1`;

  const res = await query(queryString, [username]);

  if (res.rows.length === 0) {
    return null;
  }

  const jobA = res.rows[0];

  return {
    companyId: jobA.companyId,
    password: jobA.password,
    username: jobA.username,
    lastUpdateDate: jobA.lastUpdateDate,
    approveRequestDate: jobA.approveRequestDate,
    validatedDate: jobA.validatedDate,
  };
};

export const getAllUnverifyJobAByCompany = async (companyId: string) => {
  const queryString = `SELECT 
                          "Username" AS "username",
                          "Company_ID" AS "companyId",
                          "Password" AS "password",
                          "Last_Update_Date" AS "lastUpdateDate",
                          "Approve_Request_Date" AS "approveRequestDate",
                          "Validated_By" AS "validatedBy"
                       FROM "JOB_ANNOUNCER"
                       WHERE "Company_ID" = $1 AND "Approve_Request_Date" IS NULL`;

  const res = await query(queryString, [companyId]);

  const jobAnnouncers: JobAnnouncerWithUser[] = [];

  for (const row of res.rows) {
    const userQuery = `SELECT 
                          "Username" AS "username",
                          "First_Name" AS "firstName",
                          "Last_Name" AS "lastName",
                          "Email_Google" AS "email",
                          "Phone_Number" AS "phoneNumber"
                       FROM "USER" WHERE "Username" = $1`;
    const userRes = await query(userQuery, [row.username]);
    const user = userRes.rows[0];

    jobAnnouncers.push({
      ...row,
      ...user,
    });
  }

  return jobAnnouncers;
};

export const approveJobA = async (usernames: string[], approver: string) => {
  const updateJobAnnouncer = `UPDATE "JOB_ANNOUNCER"
                       SET "Approve_Request_Date" = CURRENT_TIMESTAMP,
                           "Last_Update_Date" = CURRENT_TIMESTAMP,
                           "Validated_By" = $2
                       WHERE "Username" = ANY($1)`;

  await query(updateJobAnnouncer, [usernames, approver]);

  const updateUsers = `UPDATE "USER"
                        SET "Is_Active" = 1
                        WHERE "Username" = ANY($1)`;

  await query(updateUsers, [usernames]);
};

export const rejectJobA = async (usernames: string[]) => {
  const deleteJobAnnouncer = `DELETE FROM "JOB_ANNOUNCER"
                       WHERE "Username" = ANY($1)`;

  await query(deleteJobAnnouncer, [usernames]);

  const deleteUser = `DELETE FROM "USER"
                       WHERE "Username" = ANY($1)`;

  await query(deleteUser, [usernames]);
};
