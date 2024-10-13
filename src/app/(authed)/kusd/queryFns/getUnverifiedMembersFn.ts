import axios from "axios";
import { CompanyMemberResponse } from "~/app/api/kusd/companies/[companyId]/members/route";

export const getUnverifiedMembersFn = async (id: string) => {
  const res = await axios.get<{ members: CompanyMemberResponse[] }>(
    `/api/kusd/companies/${id}/members`,
  );
  return res.data;
};
