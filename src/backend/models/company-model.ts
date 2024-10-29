import { query } from "~/lib/db";
import type { Address } from "~/types/address";

const connectTag = async (tagName: string, companyId: string) => {
  const isTagExistsQuery = `SELECT EXISTS(SELECT "Tag_Name" FROM "TAG" WHERE "Tag_Name" = $1)`;

  const { rows } = await query(isTagExistsQuery, [tagName]);
  const isTagExists = rows[0].exists;

  if (!isTagExists) {
    const createTagQuery = `INSERT INTO "TAG" ("Tag_Name") VALUES ($1)`;
    await query(createTagQuery, [tagName]);
  }

  const connectTagQuery = `INSERT INTO "TAGGING" ("Tag_Name","Company_ID") VALUES ($1,$2)`;
  await query(connectTagQuery, [tagName, companyId]);
};

interface CreateCompany {
  name: string;
  address: Address;
  category: string;
  image: string;
  taxId: string;
  requestedFile: string;
  isActive: boolean;
}

export const createCompany = async (
  payload: CreateCompany,
): Promise<string> => {
  const { address, name, image, taxId, isActive, requestedFile, category } =
    payload;

  const _isActive = isActive ? 1 : 0;
  const queryString = `INSERT INTO "APPROVED_COMPANY" (
                          "Company_Name",
                          "Company_Address",
                          "Company_Image",
                          "Tax_ID",
                          "Requested_File",
                          "Company_Is_Active",
                          "Last_Update_Date"
                     ) VALUES (
                          $1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP
                     ) RETURNING "Company_ID"`;

  const res = await query(queryString, [
    name,
    address,
    image,
    taxId,
    requestedFile,
    _isActive,
  ]);

  const companyId = res.rows[0].Company_ID;

  await connectTag(category, companyId);

  return companyId;
};
