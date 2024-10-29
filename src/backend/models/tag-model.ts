import { query } from "~/lib/db";

export const getAllTags = async () => {
  const queryString = `SELECT "Tag_Name" as name FROM "TAG"`;

  const res = await query(queryString);

  return res.rows;
};
