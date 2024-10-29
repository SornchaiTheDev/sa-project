import { kusdMiddleware } from "~/app/api/_middlewares/kusdMiddleware";
import { getAllUnverifyCompanies } from "~/backend/models/company-model";

export const dynamic = "force-dynamic";

export const GET = kusdMiddleware(async () => {
  const companies = await getAllUnverifyCompanies();

  return Response.json({
    companies,
  });
});
