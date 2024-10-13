import axios from "axios";
import { ApprovedCompany } from "~/types/approvedCompany";

export const getAllCompaniesFn = async () => {
  const res = await axios.get<{ companies: ApprovedCompany[] }>(
    "/api/kusd/companies",
  );
  return res.data;
};
