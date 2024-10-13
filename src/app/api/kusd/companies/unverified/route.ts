import { kusdMiddleware } from "~/app/api/_middlewares/kusdMiddleware";
import { ApprovedCompanyRepository } from "~/backend/repositories/approvedCompanyRepository";

export const dynamic = "force-dynamic";

export const GET = kusdMiddleware(async () => {
  const companyRepo = new ApprovedCompanyRepository();
  const companies = await companyRepo.getAllUnverified();

  return Response.json({
    companies,
  });
});
