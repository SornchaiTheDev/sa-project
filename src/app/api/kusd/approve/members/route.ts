import { z } from "zod";
import { kusdMiddleware } from "~/app/api/_middlewares/kusdMiddleware";
import { approveJobA } from "~/backend/models/jobA-model";

const requestSchema = z.object({
  usernames: z.array(z.string()),
});

export const POST = kusdMiddleware(async (kusdInfo, req) => {
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

  try {
    const { uid } = kusdInfo;
    await approveJobA(usernames, uid);

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
