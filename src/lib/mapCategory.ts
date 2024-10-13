import { companyCategories } from "~/__mocks__/company-categories";

export const mapCategory = (category: string): string => {
  const categoryName =
    companyCategories.find((c) => c.id === category)?.name ?? "Other";
  return categoryName;
};
