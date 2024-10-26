import axios from "axios";
import { Province } from "~/types/address";

export const getProvinces = async () => {
  const res = await axios.get<{ provinces: Province[] }>(
    "/api/address/provinces",
  );
  return res.data.provinces;
};
