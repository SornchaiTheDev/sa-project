import { JobAnnouncerRepository } from "~/backend/repositories/jobAnnouncerRepository";

export const POST = async (req: Request) => {
  const body = await req.json();

  const jobAnnouncerRepo = new JobAnnouncerRepository();

  try {
    await jobAnnouncerRepo.create({
      companyId: body.company_id,
      email: body.joba_email_google,
      firstName: body.joba_first_name,
      lastName: body.joba_last_name,
      password: body.joba_password,
      phoneNumber: body.joba_phone_number,
      title: body.joba_title,
      username: body.joba_username,
    });
    return Response.json({ message: "Job announcer created", code: "CREATED" });
  } catch (err) {
    return Response.json(
      {
        message: "Error creating job announcer",
        code: "INTERNAL_SERVER_ERROR",
      },
      { status: 500 },
    );
  }
};
