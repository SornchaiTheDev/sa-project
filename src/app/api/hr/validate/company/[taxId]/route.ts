import { getCompanyByTaxID } from "~/backend/models/company-model";

export const GET = async (
  _: Request,
  { params }: { params: { taxId: string } },
) => {
  const company = await getCompanyByTaxID(params.taxId);

  return Response.json({
    company: company ?? null,
  });
};
