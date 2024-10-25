import axios from "axios";
import { DBDData } from "~/types/dbdData";

export const GET = async (
  _: Request,
  { params }: { params: { taxID: string } },
) => {
  const { taxID } = params;

  if (taxID.length !== 13) return;

  let isValid = false;

  try {
    const res = await axios.get<DBDData>(
      `https://openapi.dbd.go.th/api/v1/juristic_person/${taxID}`,
    );

    if (res.data.status.code === "1000") {
      isValid = true;
    }
  } catch (err) {}

  return Response.json({
    isValid,
  });
};
