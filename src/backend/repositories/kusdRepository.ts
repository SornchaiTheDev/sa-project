import { KUSD } from "~/types/kusd";
import { execute, query } from "../../lib/db";
import { CreateKUSD } from "../DTO/kusdDTO";

export class KUSDRepository {
  public async getByUsername(email: string): Promise<KUSD | undefined> {
    const text = `
  SELECT * FROM "KUSD"
  WHERE "KUSD_Username" = $1
`;

    const values = [email];

    const res = await query(text, values);

    if (res.length === 0) return undefined;

    return {
      username: res[0].STU_Username,
      title: res[0].STU_Title,
      firstName: res[0].STU_First_Name,
      lastName: res[0].STU_Last_Name,
      email: res[0].STU_Email_Google,
      isActive: res[0].STU_Active,
    };
  }

  public async create(kusd: CreateKUSD): Promise<void> {
    try {
      const text = `
        INSERT INTO "KUSD" (
          "KUSD_Username",
          "KUSD_Title",
          "KUSD_First_Name",
          "KUSD_Last_Name",
          "KUSD_Email_Google"
        ) VALUES ($1, $2, $3, $4, $5)
      `;

      const values = [
        kusd.username,
        kusd.title,
        kusd.firstName,
        kusd.lastName,
        kusd.email,
      ];
      await execute(text, values);
    } catch (error) {
      console.error("Failed to create kusd in the database", error);
      throw error;
    }
  }
}
