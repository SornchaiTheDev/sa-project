import { query } from "../../lib/db";

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
}
