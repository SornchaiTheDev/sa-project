import { getAllVerifyCompanies } from "~/backend/models/company-model";
import { kusdMiddleware } from "../../_middlewares/kusdMiddleware";

export const dynamic = "force-dynamic";

export const GET = kusdMiddleware(async () => {
  const companies = await getAllVerifyCompanies();

  return Response.json({
    companies,
  });
});
