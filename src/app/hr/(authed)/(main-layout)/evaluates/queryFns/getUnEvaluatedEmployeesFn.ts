import axios from "axios";
import type { Employee } from "~/types/employee";

export const getUnEvaluatedEmployeesFn = async (companyId: string) => {
  const res = await axios.get<{ employees: Employee[] }>(
    `/api/companies/${companyId}/employees?show=un-evaluated`,
  );
  return res.data.employees;
};
