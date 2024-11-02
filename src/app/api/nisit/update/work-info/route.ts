import { EducationAndWorks } from "~/app/(authed)/(half-layout)/onboarding/educations-and-works/schemas/education-and-works";
import { jwtMiddleware } from "~/app/api/_middlewares/jwtMiddleware";
import { query } from "~/lib/db";
import { UserInfo } from "~/types/userInfo";

export const POST = jwtMiddleware(async (info: UserInfo, req) => {
  const { uid } = info;
  const body = (await req.json()) as EducationAndWorks;

  try {
    const updateQuery = `
UPDATE "STUDENT"
SET     "Description" = $1,
	"GPAX" = $2,
	"Faculty" = $3,
	"Major" = $4
WHERE "Username" = $5
	`;
    await query(updateQuery, [
      body.description,
      body.gpax,
      body.faculty,
      body.major,
      uid,
    ]);

    return Response.json({
      code: "SUCCESS",
    });
  } catch (err) {
    console.log(err);
  }

  return Response.json({
    code: "ERROR",
    message: "Something went wrong",
  });
});
