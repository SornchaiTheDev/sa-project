import axios from "axios";
import type { Tambon } from "~/types/address";

export const getTambons = async (provinceId: number, amphureId: number) => {
  const res = await axios.get<{ tambons: Tambon[] }>(
    `/api/address/provinces/${provinceId}/amphures/${amphureId}/tambons`,
  );
  return res.data.tambons;
};
