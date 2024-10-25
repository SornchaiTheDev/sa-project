import { query } from "~/lib/db";
import { Province } from "~/types/address";

export const GET = async (
  _: Request,
  { params }: { params: { provinceId: string } },
) => {
  const { provinceId } = params;
  const selected = `SELECT name_th as name, id FROM thai_amphures WHERE province_id = $1`;
  const queryParams = [provinceId];
  const res = (await query(selected, queryParams)) as Province[];

  return Response.json({
    amphures: res,
  });
};
