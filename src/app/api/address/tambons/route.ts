import { query } from "~/lib/db";
import { Province } from "~/types/address";

export const GET = async (req: Request) => {
  const searchParams = new URL(req.url).searchParams;
  const amphurName = searchParams.get("amphur") ?? "";

  const selected = `SELECT name_th as name, id FROM thai_tambons WHERE amphure_id = (
                        SELECT id 
                        FROM thai_amphures 
                        WHERE name_th = $1
                    )`;
  const queryParams = [amphurName];
  const res = (await query(selected, queryParams)) as Province[];

  return Response.json({
    tambons: res,
  });
};
