import { createStudent } from "~/backend/models/student-model";
import type { StudentOnboarding } from "~/types/requests/student-onboarding";

export const POST = async (req: Request) => {
  const body = (await req.json()) as StudentOnboarding;
  try {
    await createStudent(body);
  } catch (err) {
    console.log(err);
    return Response.json(
      {
        message: "INTERNAL_SERVER_ERROR",
        code: 500,
      },
      { status: 500 },
    );
  }

  return Response.json(
    {
      message: "SUCCESS",
      code: 200,
    },
    { status: 200 },
  );
};
