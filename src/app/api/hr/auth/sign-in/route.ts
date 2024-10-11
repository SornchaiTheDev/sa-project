import dayjs from "dayjs";
import { comparePassword } from "~/backend/libs/bcrypt";
import { JobAnnouncerRepository } from "~/backend/repositories/jobAnnouncerRepository";
import { env } from "~/configs/env";
import { setHTTPOnlyCookie } from "~/lib/cookies";
import { signJwt } from "~/lib/jwt";

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

    const accessToken = await signJwt(
      {
        username: user.username,
      },
      env.JWT_SECRET,
    );

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
