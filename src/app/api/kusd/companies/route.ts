import { ApprovedCompanyRepository } from "~/backend/repositories/approvedCompanyRepository";
import { kusdMiddleware } from "../../_middlewares/kusdMiddleware";

export const dynamic = "force-dynamic";

export const GET = kusdMiddleware(async () => {
  const companyRepo = new ApprovedCompanyRepository();
  const companies = await companyRepo.getAllUnverified();

  return Response.json({
    companies,
  });
});
