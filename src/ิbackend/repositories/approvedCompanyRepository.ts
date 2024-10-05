import { query } from "../../lib/db";
import { ApprovedCompany } from "../../types/approvedCompany";

export class ApprovedCompanyRepository {
  public async create(approvedCompany: ApprovedCompany): Promise<void> {
    try {
      const text = `
        INSERT INTO APPROVED_COMPANY (
          Company_ID,
          Company_Name,
          Company_Address,
          Tax_ID,
          Requested_File
        ) VALUES ($1, $2, $3, $4, $5)
      `;
      const values = [
        approvedCompany.id,
        approvedCompany.name,
        approvedCompany.address,
        approvedCompany.taxId,
        approvedCompany.requestedFile,
      ];
      await query(text, values);
    } catch (error) {
      console.error("Failed to create approvedCompany in the database", error);
      throw error;
    }
  }

  public async getById(id: string): Promise<ApprovedCompany | null> {
    try {
      const text = `
        SELECT * FROM APPROVED_COMPANY
        WHERE Company_ID = $1
      `;
      const values = [id];
      const result = await query(text, values);
      return result.length > 0 ? (result[0] as ApprovedCompany) : null;
    } catch (error) {
      console.error("Failed to fetch approvedCompany from the database", error);
      throw error;
    }
  }
}
