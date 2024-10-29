import dayjs from "dayjs";
import { comparePassword } from "~/backend/libs/bcrypt";
import { getJobAByUsername } from "~/backend/models/jobA-model";
import { getUser } from "~/backend/models/user-model";
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
    const jobA = await getJobAByUsername(body.username);
    const user = await getUser(body.username);

    if (user === null) {
      throw new Error("UNAUTHORIZED");
    }

    if (!user.isActive) {
      throw new Error("NOT_ACTIVE");
    }

    const isSame = comparePassword(body.password, jobA.password);
    if (!isSame) {
      throw new Error("UNAUTHORIZED");
    }

    const payload: HRInfo = {
      username: user.username,
      title: user.title,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive === 1,
      companyId: jobA.companyId,
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
    console.log(err);
    if (err instanceof Error) {
      if (err.message === "UNAUTHORIZED") {
        return Response.json(
          { message: "Username or password is incorrect", code: "UNAUTHORIZE" },
          { status: 401 },
        );
      }
      if (err.message === "NOT_ACTIVE") {
        return Response.json(
          { message: "User is not active", code: "NOT_ACTIVE" },
          { status: 401 },
        );
      }
    }

    return Response.json(
      { message: "Something went wrong", code: "INTERNAL_SERVER_ERROR" },
      { status: 500 },
    );
  }
};
