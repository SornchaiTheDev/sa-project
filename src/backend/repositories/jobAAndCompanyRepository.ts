import pool from "../../lib/db";
import { HRSignUpDTO } from "../DTO/hrSignupDTO";
import { hashPassword } from "../libs/bcrypt";

export class JobAAndCompanyRepository {
  public async create(payload: HRSignUpDTO) {
    const {
      name,
      taxId,
      address,
      logoUrl,
      bookUrl,
      category,
      username,
      title,
      firstName,
      lastName,
      email,
      password,
      isVerified,
    } = payload;

    const client = await pool.connect();

    const isApproved = isVerified ? 1 : 0;

    try {
      await client.query("BEGIN");

      const createTag = `INSERT INTO "TAG" ("Tag_Name") VALUES ($1) ON CONFLICT ("Tag_Name") DO NOTHING;`;
      await client.query(createTag, [category]);

      const createCompany = `INSERT INTO "APPROVED_COMPANY" (
      "Company_Name",
      "Tax_ID",
      "Company_Address",
      "Company_Image",
      "Company_Book",
      "Approved_Company_Is_Active"
    ) VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6
    ) RETURNING "Company_ID";`;

      const createdCompany = await client.query(createCompany, [
        name,
        taxId,
        address,
        logoUrl,
        bookUrl,
        isApproved,
      ]);

      const companyID = createdCompany.rows[0].Company_ID;

      const createRelateTag = `INSERT INTO "RELATION_TAGGED" ("Company_ID", "Tag_Name") VALUES ($1, $2)`;

      await client.query(createRelateTag, [companyID, category]);

      const createJobAnnouncer = `INSERT INTO "JOB_ANNOUNCER" (
      "JOBA_Username",
      "Company_ID",
      "JOBA_Title",
      "JOBA_First_Name",
      "JOBA_Last_Name",
      "JOBA_Email_Google",
      "JOBA_Is_Active",
      "JOBA_Last_Update_Date",
      "JOBA_Approve_Request_Date",
      "JOBA_Password"
    ) VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6,
      $7,
      CURRENT_TIMESTAMP,
      NULL,
      $8
    );`;

      const hashedPassword = await hashPassword(password);
      await client.query(createJobAnnouncer, [
        username,
        companyID,
        title,
        firstName,
        lastName,
        email,
        isApproved,
        hashedPassword,
      ]);

      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }
}
