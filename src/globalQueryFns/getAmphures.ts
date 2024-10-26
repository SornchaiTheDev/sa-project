import axios from "axios";
import type { Amphure } from "~/types/address";

export const getAmphures = async (provinceId: number) => {
  const res = await axios.get<{ amphures: Amphure[] }>(
    `/api/address/provinces/${provinceId}/amphures`,
  );
  return res.data.amphures;
};
