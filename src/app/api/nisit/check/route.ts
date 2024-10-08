import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { StudentRepository } from "~/backend/repositories/studentRepository";
import { env } from "~/configs/env";
import { getPayload, verifyJwt } from "~/lib/jwt";
import { Student } from "~/types/student";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const accessToken = cookies().get("access_token")?.value;
  if (accessToken === undefined) {
    return Response.json(
      {
        message: "UNAUTHORIZED",
        code: 401,
      },
      { status: 401 },
    );
  }

  try {
    await verifyJwt(accessToken, env.JWT_SECRET);
  } catch (err) {
    return Response.json(
      {
        message: "UNAUTHORIZED",
        code: 401,
      },
      { status: 401 },
    );
  }

  const payload = getPayload(accessToken);

  if (payload.typePerson === "3") {
    const studentRepo = new StudentRepository();
    let student: Student | undefined;
    try {
      student = await studentRepo.getByUsername(payload.idCode);
    } catch (err) {
      console.error("Failed to fetch student in the database", err);
      return Response.json(
        {
          message: "INTERNAL_SERVER_ERROR",
          code: 500,
        },
        { status: 500 },
      );
    }

    if (student === undefined) {
      try {
        await studentRepo.create({
          username: payload.idCode,
          title: payload.thaiPreName,
          firstName: payload.thFirstName,
          lastName: payload.thSurName,
          email: payload.googleMail,
          faculty: payload.faculty,
        });
      } catch (err) {
        console.error("Failed to create student in the database", err);
      }
      redirect("/onboarding/user-info");
    } else {
      if (student.phoneNumber === null) {
        redirect("/onboarding/user-info");
      } else if (student.gpax === null) {
        redirect("/onboarding/educations-and-works");
      }
      redirect("/");
    }
  }
  return Response.json(
    {
      message: "SOMETING_WENT_WRONG",
      code: 500,
    },
    { status: 500 },
  );
};
