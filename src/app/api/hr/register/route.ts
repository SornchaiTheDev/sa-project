import { JobAnnouncerDTO } from "~/backend/DTO/jobAnnouncerDTO";
import { JobAnnouncerRepository } from "~/backend/repositories/jobAnnouncerRepository";

export const POST = async (req: Request) => {
  const body = (await req.json()) as JobAnnouncerDTO;

  const jobAnnouncerRepo = new JobAnnouncerRepository();

  try {
    await jobAnnouncerRepo.create(body);
    return Response.json({ message: "Job announcer created", code: "CREATED" });
  } catch (err) {
    console.log(err);
    return Response.json(
      {
        message: "Error creating job announcer",
        code: "INTERNAL_SERVER_ERROR",
      },
      { status: 500 },
    );
  }
};
