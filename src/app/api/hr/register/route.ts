import { JobAAndCompanyRepository } from "~/backend/repositories/jobAAndCompanyRepository";

export const POST = async (req: Request) => {
  const body = await req.json();

  const jobAnCompany = new JobAAndCompanyRepository();

  try {
    await jobAnCompany.create({
      title: body.title,
      firstName: body.firstName,
      surName: body.surName,
      email: body.email,
      username: body.username,
      category: body.category,
      address: body.address,
      bookUrl: body.bookUrl[0].url,
      logoUrl: body.logoUrl[0].url,
      taxId: body.taxId,
      name: body.name,
      password: body.password,
      phone: body.phone,
      confirmPassword: body.confirmPassword,
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
