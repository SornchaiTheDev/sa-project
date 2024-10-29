import { query } from "~/lib/db";
import { hashPassword } from "../libs/bcrypt";

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
