import { kusdMiddleware } from "~/app/api/_middlewares/kusdMiddleware";
import { rejectCompany } from "~/backend/models/company-model";

export const POST = kusdMiddleware(async (_, __, { params }) => {
  const { companyId } = params;
  try {
    await rejectCompany(companyId);
    return Response.json({ message: "Company rejected", code: "SUCCESS" });
  } catch (err) {
    console.error("Failed to reject company", err);
    return Response.json(
      {
        message: "Failed to reject company",
        code: "INTERNAL_SERVER_ERROR",
      },
      { status: 500 },
    );
  }
});
