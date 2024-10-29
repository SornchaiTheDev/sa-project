import { kusdMiddleware } from "~/app/api/_middlewares/kusdMiddleware";
import { approveCompany } from "~/backend/models/company-model";

export const POST = kusdMiddleware(async (_, __, { params }) => {
  const { companyId } = params;
  try {
    await approveCompany(companyId);
    return Response.json({ message: "Company approved", code: "SUCCESS" });
  } catch (error) {
    console.error("Failed to approve company", error);
    return Response.json(
      {
        message: "Failed to approve company",
        code: "INTERNAL_SERVER_ERROR",
      },
      { status: 500 },
    );
  }
});
