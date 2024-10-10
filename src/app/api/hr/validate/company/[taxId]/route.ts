import { ApprovedCompanyRepository } from "~/backend/repositories/approvedCompanyRepository";

export const GET = async (
  _: Request,
  { params }: { params: { taxId: string } },
) => {
  const approvedCompany = new ApprovedCompanyRepository();
  const company = await approvedCompany.getByTaxId(params.taxId);

  return Response.json({
    company,
  });
};
