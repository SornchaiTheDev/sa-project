import { Address } from "~/app/hr/onboarding/(forms)/company/create/schemas/company-info-schema";

export const parseAddress = (address: string) => {
  if (address.length === 0) return { name: "", id: -1 };
  return JSON.parse(address) as Address;
};
