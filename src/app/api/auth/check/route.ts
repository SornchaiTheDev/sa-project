import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { KUSDRepository } from "~/backend/repositories/kusdRepository";
import { StudentRepository } from "~/backend/repositories/studentRepository";
import { env } from "~/configs/env";
import { getPayload, verifyJwt } from "~/lib/jwt";
import { KUSD } from "~/types/kusd";
import { Student } from "~/types/student";
import { UserInfo } from "~/types/userInfo";

export const dynamic = "force-dynamic";

const nisitFlow = async (payload: UserInfo) => {
  const studentRepo = new StudentRepository();
  let student: Student | undefined;
  try {
    student = await studentRepo.getByUsername(payload.idCode);
  } catch (err) {
    console.error("Failed to fetch student in the database", err);
  }

  if (student === undefined) {
    try {
      await studentRepo.create({
        username: payload.uid,
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
};

const kusdFlow = async (payload: UserInfo) => {
  let kusd: KUSD | undefined;
  const kusdRepo = new KUSDRepository();
  try {
    kusd = await kusdRepo.getByUsername(payload.idCode);
  } catch (err) {
    console.error("Failed to fetch student in the database", err);
  }

  if (kusd === undefined) {
    try {
      await kusdRepo.create({
        username: payload.uid,
        title: payload.thaiPreName,
        firstName: payload.thFirstName,
        lastName: payload.thSurName,
        email: payload.googleMail,
      });
    } catch (err) {
      console.error("Failed to create kusd in the database", err);
    }
    redirect("/kusd");
  }
};

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

  switch (payload.typePerson) {
    case "3":
      await nisitFlow(payload);
      break;
    case "2":
      await kusdFlow(payload);
      break;
  }

  return Response.json(
    {
      message: "INTERNAL_SERVER_ERROR",
      code: 500,
    },
    { status: 500 },
  );
};
