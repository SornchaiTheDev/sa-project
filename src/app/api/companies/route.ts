import { ApprovedCompanyRepository } from "~/backend/repositories/approvedCompanyRepository";

export const GET = async (req: Request) => {
  const searchParams = new URL(req.url).searchParams;

  const companyRepo = new ApprovedCompanyRepository();
  const name = searchParams.get("search") ?? "";

  try {
    const result = await companyRepo.getByName(name);
    await new Promise((res, rej) => setTimeout(() => res("ok"), 1000));
    return Response.json({
      companies: result,
    });
  } catch (err) {
    console.log(err);
    return Response.json(
      { message: "Error fetching companies", code: "INTERNAL_SERVER_ERROR" },
      { status: 500 },
    );
  }
};
