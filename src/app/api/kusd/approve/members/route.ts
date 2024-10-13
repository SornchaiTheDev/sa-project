import { z } from "zod";
import { kusdMiddleware } from "~/app/api/_middlewares/kusdMiddleware";
import { JobAnnouncerRepository } from "~/backend/repositories/jobAnnouncerRepository";

const requestSchema = z.object({
  usernames: z.array(z.string()),
});

export const POST = kusdMiddleware(async (_, req) => {
  let usernames: string[];
  try {
    const body = await req.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      throw new Error("INVALID_REQUEST");
    }
    usernames = parsed.data.usernames;
  } catch (err) {
    return Response.json(
      {
        message: "Invalid request",
        code: "INVALID_REQUEST",
      },
      { status: 400 },
    );
  }

  const jobAnnouncerRepo = new JobAnnouncerRepository();

  try {
    await jobAnnouncerRepo.approveMembers(usernames);

    return Response.json({
      message: "Members approved",
      code: "MEMBERS_APPROVED",
    });
  } catch (err) {
    console.log(err);
    return Response.json(
      {
        message: "Internal server error",
        code: "INTERNAL_SERVER_ERROR",
      },
      { status: 500 },
    );
  }
});
