import axios from "axios";
import type { Tambon } from "~/types/address";

export const getTambons = async (amphureName: string) => {
  const res = await axios.get<{ tambons: Tambon[] }>(
    `/api/address/tambons?amphur=${amphureName}`,
  );
  return res.data.tambons;
};
