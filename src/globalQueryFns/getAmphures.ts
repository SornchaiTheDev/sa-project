import axios from "axios";
import type { Amphur } from "~/types/address";

export const getAmphures = async (provinceName: string) => {
  const res = await axios.get<{ amphures: Amphur[] }>(
    `/api/address/amphures?province=${provinceName}`,
  );
  return res.data.amphures;
};
