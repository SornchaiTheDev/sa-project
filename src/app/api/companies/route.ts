import { getCompanyByName } from "~/backend/models/company-model";

export const GET = async (req: Request) => {
  const searchParams = new URL(req.url).searchParams;

  const name = searchParams.get("search") ?? "";

  try {
    const result = await getCompanyByName(name);
    return Response.json({
      companies: result,
    });
  } catch (err) {
    return Response.json(
      { message: "Error fetching companies", code: "INTERNAL_SERVER_ERROR" },
      { status: 500 },
    );
  }
};
