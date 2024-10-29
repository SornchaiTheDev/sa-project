import { query } from "~/lib/db";
import { hashPassword } from "../libs/bcrypt";
import { JobAnnouncer } from "~/types/jobAnnouncer";

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
                                 "Last_Update_Date",
                                 "Approve_Request_Date"
                     ) VALUES (
                              $1,
                              $2,
                              $3,
                              CURRENT_TIMESTAMP,
                              NULL
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
