import { query } from "~/lib/db";
import { Province } from "~/types/address";

export const GET = async (req: Request) => {
  const searchParams = new URL(req.url).searchParams;
  const provinceName = searchParams.get("province") ?? "";

  const selected = `SELECT name_th as name, id 
                    FROM thai_amphures 
                    WHERE province_id = (
                        SELECT id 
                        FROM thai_provinces 
                        WHERE name_th = $1
                    )`;
  const queryParams = [provinceName];
  const res = (await query(selected, queryParams)) as Province[];

  return Response.json({
    amphures: res,
  });
};
