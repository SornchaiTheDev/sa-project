import axios from "axios";
import type { Amphure } from "~/types/address";

export const getAmphures = async (provinceName: string) => {
  const res = await axios.get<{ amphures: Amphure[] }>(
    `/api/address/amphures?province=${provinceName}`,
  );
  return res.data.amphures;
};