import { query } from "~/lib/db";
import { Province } from "~/types/address";

export const GET = async () => {
  const selected = `SELECT name_th as name, id FROM thai_provinces`;
  const res = (await query(selected)).rows as Province[];

  return Response.json({
    provinces: res,
  });
};
