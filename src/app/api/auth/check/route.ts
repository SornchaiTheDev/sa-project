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

const clearAuthCookies = () => {
  cookies().delete("access_token");
  cookies().delete("refresh_token");
};

const nisitFlow = async (payload: UserInfo) => {
  // const accountYear = parseInt(payload.idCode.slice(0, 2));
  //
  // const currentYear = parseInt(dayjs().format("BBBB").slice(2, 4));
  // if (currentYear - accountYear > 4) {
  //   clearAuthCookies();
  //   redirect("/auth/sign-in?error=UNAUTHORIZED");
  // }

  const studentRepo = new StudentRepository();
  let student: Student | undefined;
  try {
    student = await studentRepo.getByUsername(payload.uid);
  } catch (err) {
    console.error("Failed to fetch student in the database", err);
  }

  if (student === undefined) {
    try {
      await studentRepo.create({
        username: payload.uid,
        title: payload.thaiPreName ?? "นาย",
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
    const hasCompletedForm = await studentRepo.hasCompletedForm(payload.uid);
    if (!hasCompletedForm) {
      redirect("/onboarding/user-info");
    }
    redirect("/");
  }
};

const kusdFlow = async (payload: UserInfo) => {
  let kusd: KUSD | undefined;
  const kusdRepo = new KUSDRepository();
  try {
    kusd = await kusdRepo.getByUsername(payload.uid);
  } catch (err) {
    console.error("Failed to fetch student in the database", err);
  }

  // TODO: Check if user is kusd department
  // if (payload.faculty !== "กองพัฒนานิสิต") {
  //   clearAuthCookies();
  //   redirect("/auth/sign-in?error=UNAUTHORIZED");
  // }

  if (kusd === undefined) {
    try {
      await kusdRepo.create({
        username: payload.uid,
        title: payload.thaiPreName ?? "นาย",
        firstName: payload.thFirstName,
        lastName: payload.thSurName,
        email: payload.googleMail,
      });
    } catch (err) {
      console.error("Failed to create kusd in the database", err);
    }
  }
  redirect("/kusd");
};

export const GET = async () => {
  const accessToken = cookies().get("access_token")?.value;
  if (accessToken === undefined) {
    redirect("/auth/sign-in?error=UNAUTHORIZED");
  }

  try {
    await verifyJwt(accessToken, env.JWT_SECRET);
  } catch (err) {
    clearAuthCookies();
    redirect("/auth/sign-in?error=UNAUTHORIZED");
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

  clearAuthCookies();
  redirect("/auth/sign-in?error=SOMETHING_WENT_WRONG");
};