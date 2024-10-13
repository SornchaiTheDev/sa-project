import { kusdMiddleware } from "~/app/api/_middlewares/kusdMiddleware";
import { ApprovedCompanyRepository } from "~/backend/repositories/approvedCompanyRepository";

export const POST = kusdMiddleware(async (_, __, { params }) => {
  const { companyId } = params;

  const companyRepo = new ApprovedCompanyRepository();
  try {
    await companyRepo.approve(companyId);
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
