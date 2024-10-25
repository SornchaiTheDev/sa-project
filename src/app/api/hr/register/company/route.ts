import { JobAAndCompanyRepository } from "~/backend/repositories/jobAAndCompanyRepository";
import { parseAddress } from "~/lib/parseAddress";

export const POST = async (req: Request) => {
  const body = await req.json();

  const jobAnCompany = new JobAAndCompanyRepository();
  try {
    await jobAnCompany.create({
      title: body.title,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      username: body.username,
      category: body.category,
      place: body.place,
      province: parseAddress(body.province).name,
      amphur: parseAddress(body.amphur).name,
      tambon: body.tambon.name,
      bookUrl: body.bookUrl[0].url,
      logoUrl: body.logoUrl[0].url,
      taxId: body.taxId,
      name: body.name,
      password: body.password,
      phone: body.phone,
      confirmPassword: body.confirmPassword,
      isVerified: body.isVerified,
    });
  } catch (err) {
    return Response.json(
      {
        code: "INTERNAL_SERVER_ERROR",
        message: "Error creating Job announcer and company",
      },
      { status: 500 },
    );
  }

  return Response.json({
    code: "CREATED",
    message: "Created Job announcer and company successfully",
  });
};
