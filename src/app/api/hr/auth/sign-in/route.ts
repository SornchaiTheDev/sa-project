import dayjs from "dayjs";
import { comparePassword } from "~/backend/libs/bcrypt";
import { JobAnnouncerRepository } from "~/backend/repositories/jobAnnouncerRepository";
import { env } from "~/configs/env";
import { setHTTPOnlyCookie } from "~/lib/cookies";
import { signJwt } from "~/lib/jwt";
import { HRInfo } from "~/types/hrInfo";

interface SignInRequest {
  username: string;
  password: string;
}

export const POST = async (req: Request) => {
  const body = (await req.json()) as SignInRequest;

  try {
    const jobAnnouncerRepo = new JobAnnouncerRepository();
    const user = await jobAnnouncerRepo.getByUsername(body.username);
    if (user === null) {
      throw new Error("UNAUTHORIZED");
    }

    const isSame = comparePassword(body.password, user.password);
    if (!isSame) {
      throw new Error("UNAUTHORIZED");
    }

    const payload: HRInfo = {
      username: user.username,
      title: user.title,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
      companyId: user.companyId,
      phoneNumber: user.phoneNumber ?? "",
      role: "JOB_ANNOUNCER",
    };

    const accessToken = await signJwt(payload, env.JWT_SECRET);

    setHTTPOnlyCookie("access_token", accessToken, {
      expires: dayjs().add(30, "minute").toDate(),
    });

    const refreshToken = await signJwt(
      { username: user.username },
      env.JWT_REFRESH_SECRET,
    );

    setHTTPOnlyCookie("refresh_token", refreshToken, {
      expires: dayjs().add(1, "day").toDate(),
    });

    return Response.json({ message: "Login success", code: "OK" });
  } catch (err) {
    return Response.json(
      { message: "Username or password is incorrect", code: "UNAUTHORIZE" },
      { status: 401 },
    );
  }
};