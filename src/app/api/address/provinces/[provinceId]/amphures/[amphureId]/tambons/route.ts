import { query } from "~/lib/db";
import { Province } from "~/types/address";

export const GET = async (
  _: Request,
  { params }: { params: { amphureId: string } },
) => {
  const { amphureId } = params;
  const selected = `SELECT name_th as name, id FROM thai_tambons WHERE amphure_id = $1`;
  const queryParams = [amphureId];
  const res = (await query(selected, queryParams)) as Province[];

  return Response.json({
    tambons: res,
  });
};
