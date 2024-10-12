import { JobAnnouncer } from "~/types/jobAnnouncer";
import { query } from "../../lib/db";
import { JobAnnouncerDTO } from "../DTO/jobAnnouncerDTO";
import { hashPassword } from "../libs/bcrypt";

export class JobAnnouncerRepository {
  public async checkUsername(
    username: string,
  ): Promise<"USERNAME_EXISTS" | "AVAILABLE"> {
    const text = `
  SELECT SUM(CASE WHEN Username = $1 THEN 1 ELSE 0 END) AS UsernameCount
  FROM (
    SELECT "STU_Username" AS Username FROM "STUDENT"
    UNION
    SELECT "JOBA_Username" AS Username FROM "JOB_ANNOUNCER"
    UNION
    SELECT "KUSD_Username" AS Username FROM "KUSD"
  ) AS Combined;
  `;

    const values = [username];

    const res = await query(text, values);

    if (res[0].usernamecount > 0) return "USERNAME_EXISTS";

    return "AVAILABLE";
  }

  public async checkEmail(
    email: string,
  ): Promise<"EMAIL_EXISTS" | "AVAILABLE"> {
    const text = `SELECT SUM(CASE WHEN Email = $1 THEN 1 ELSE 0 END) AS EmailCounts
  FROM (
    SELECT "STU_Email_Google" AS Email FROM "STUDENT"
    UNION
    SELECT "JOBA_Email_Google" AS Email FROM "JOB_ANNOUNCER"
    UNION
    SELECT "KUSD_Email_Google" AS Email FROM "KUSD"
  ) AS Combined;
  `;

    const values = [email];

    const res = await query(text, values);

    if (res[0].emailcounts > 0) return "EMAIL_EXISTS";

    return "AVAILABLE";
  }

  public async create(payload: JobAnnouncerDTO): Promise<void> {
    const text = `
INSERT INTO "JOB_ANNOUNCER" (
  "JOBA_Username",
  "Company_ID",
  "JOBA_Title",
  "JOBA_First_Name",
  "JOBA_Last_Name",
  "JOBA_Phone_Number",
  "JOBA_Email_Google",
  "JOBA_Last_Update_Date",
  "JOBA_Password"
) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, $8)
`;

    const {
      username,
      companyId,
      title,
      firstName,
      lastName,
      phoneNumber,
      email,
    } = payload;

    const hashedPassword = await hashPassword(payload.password);

    const values = [
      username,
      companyId,
      title,
      firstName,
      lastName,
      phoneNumber,
      email,
      hashedPassword,
    ];

    await query(text, values);
  }

  public async getByUsername(username: string): Promise<JobAnnouncer> {
    const text = `
      SELECT *
      FROM "JOB_ANNOUNCER" 
      WHERE "JOBA_Username" = $1
    `;

    const values = [username];

    const res = await query(text, values);

    return {
      email: res[0]["JOBA_Email_Google"],
      firstName: res[0]["JOBA_First_Name"],
      lastName: res[0]["JOBA_Last_Name"],
      password: res[0]["JOBA_Password"],
      phoneNumber: res[0]["JOBA_Phone_Number"],
      title: res[0]["JOBA_Title"],
      username: res[0]["JOBA_Username"],
      isActive: res[0]["JOBA_Is_Active"] === 1,
      companyId: res[0]["Company_ID"],
      lastUpdate: res[0]["JOBA_Last_Update_Date"],
      approveRequest: res[0]["JOBA_Approve_Request_Date"],
    };
  }
}
