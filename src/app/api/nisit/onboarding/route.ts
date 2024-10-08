import { StudentRepository } from "~/backend/repositories/studentRepository";

export const POST = async (req: Request) => {
  const body = await req.json();
  const studentRepo = new StudentRepository();
  const isSuccess = await studentRepo.update({
    bod: body.bod,
    phone: body.phone,
    major: body.major,
    gpax: body.gpax,
    activitiesHours: body.activitiesHours,
    workExp: body.workExp,
    username: body.username,
  });

  if (!isSuccess) {
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
