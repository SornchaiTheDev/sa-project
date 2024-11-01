import axios from "axios";
import type { Employee } from "~/types/employee";

export const getAllEmployeesFn = async (companyId: string) => {
  const res = await axios.get<{ employees: Employee[] }>(
    `/api/companies/${companyId}/employees`,
  );
  return res.data.employees;
};
