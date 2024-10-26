import { query } from "~/lib/db";

export const GET = async () => {
  const queryString = `SELECT "Tag_Name" As name FROM "TAG"`;
  const res = await query(queryString);
  return Response.json({
    category: res.map((item) => item.name),
  });
};
