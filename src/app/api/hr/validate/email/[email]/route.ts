import { JobAnnouncerRepository } from "~/backend/repositories/jobAnnouncerRepository";

export const GET = async (
  _: Request,
  { params }: { params: { email: string } },
) => {
  const { email } = params;
  const jobA = new JobAnnouncerRepository();
  try {
    const status = await jobA.checkEmail(email);
    return Response.json({
      status,
    });
  } catch (err) {
    console.log(err);
  }
  return Response.json({ message: "Failed to get user" });
};
