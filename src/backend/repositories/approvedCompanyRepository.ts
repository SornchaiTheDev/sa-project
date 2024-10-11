import { query } from "../../lib/db";
import { ApprovedCompany } from "../../types/approvedCompany";

export class ApprovedCompanyRepository {
  public async create(approvedCompany: ApprovedCompany): Promise<void> {
    try {
      const text = `
        INSERT INTO "APPROVED_COMPANY" (
          "Company_Name",
          "Company_Address",
          "Tax_ID",
          "Requested_File"
        ) VALUES ($1, $2, $3, $4, $5)
      `;
      const values = [
        approvedCompany.name,
        approvedCompany.address,
        approvedCompany.taxId,
        approvedCompany.requestedFile,
      ];
      await query(text, values);
    } catch (error) {
      console.error("Failed to create approved company in the database", error);
      throw error;
    }
  }

  public async getById(id: string): Promise<ApprovedCompany | null> {
    try {
      const text = `
        SELECT * FROM "APPROVED_COMPANY"
        WHERE "Company_ID" = $1
      `;
      const values = [id];
      const result = await query(text, values);
      return result.length > 0 ? (result[0] as ApprovedCompany) : null;
    } catch (error) {
      console.error(
        "Failed to fetch approved company from the database",
        error,
      );
      throw error;
    }
  }

  public async getByTaxId(taxId: string): Promise<ApprovedCompany | null> {
    try {
      const text = `
        SELECT * FROM "APPROVED_COMPANY"
        WHERE "Tax_ID" = $1
      `;
      const values = [taxId];
      const result = await query(text, values);
      return result.length > 0 ? (result[0] as ApprovedCompany) : null;
    } catch (error) {
      console.error(
        "Failed to fetch approved company from the database",
        error,
      );
      throw error;
    }
  }

  public async getByName(name: string): Promise<ApprovedCompany[] | null> {
    try {
      const text = `
        SELECT * FROM "APPROVED_COMPANY"
        WHERE "Company_Name" LIKE $1 AND "Approved_Company_Is_Active" = 1
      `;
      const values = [`%${name}%`];
      const result = await query(text, values);
      return result.map((row) => ({
        taxId: row.Tax_ID,
        name: row.Company_Name,
        id: row.Company_ID,
        address: row.Company_Address,
        isActive: row.Approved_Company_Is_Active,
        companyImage: row.Company_Image,
        requestedFile: row.Requested_File,
      }));
    } catch (error) {
      console.error(
        "Failed to fetch approved company from the database",
        error,
      );
      throw error;
    }
  }
}
