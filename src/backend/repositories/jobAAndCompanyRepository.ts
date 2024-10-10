import { execute } from "../../lib/db";
import { HRSignUpDTO } from "../DTO/hrSignupDTO";
import bcrypt from "bcrypt";

const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export class JobAAndCompanyRepository {
  public async create(payload: HRSignUpDTO) {
    const text = `
        START TRANSACTION;

        INSERT INTO "APPROVED_COMPANY" (
          "Company_Name",
          "Tax_ID",
          "Company_Image",
          "Company_Book",
          "Approved_Company_Is_Active"
        ) VALUES ($1,$2,$3,$4);

        SET @last_company_id = LAST_INSERT_ID();
        INSERT INTO JOB_ANNOUNCER (
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
            ) VALUES ($5, @last_company_id, $6, $7, $8, $9, $10, $11, $12, $13);

        COMMIT;
        `;
    const {
      name,
      taxId,
      logoUrl,
      bookUrl,
      username,
      title,
      firstName,
      surName,
      email,
      password,
    } = payload;

    const hashedPassword = await hashPassword(password);

    const result = await execute(text, [
      name,
      taxId,
      logoUrl,
      bookUrl,
      false,
      username,
      title,
      firstName,
      surName,
      email,
      true,
      new Date(),
      new Date(),
      hashedPassword,
    ]);

    if (result.rowCount === null) return false;

    return result.rowCount > 0;
  }
}
