import { jwtMiddleware } from "~/app/api/_middlewares/jwtMiddleware";
import { query } from "~/lib/db";
import { UserInfo } from "~/types/userInfo";

interface FileUpload {
  id: string;
  name: string;
  objectName: string;
  size: number;
  type: string;
  url: string;
}

interface UpdatePayload {
  title: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string;
  profileImage: FileUpload[];
}

export const POST = jwtMiddleware(async (info: UserInfo, req) => {
  const { uid } = info;
  const body = (await req.json()) as UpdatePayload;

  const updateInfoString = `
	UPDATE "USER" 
	SET     "Title" = $1,
		"First_Name" = $2,
		"Last_Name" = $3,
		"Phone_Number" = $4,
		"Email_Google" = $5
	WHERE "Username" = $6
	`;

  await query(updateInfoString, [
    body.title,
    body.firstName,
    body.lastName,
    body.phoneNumber,
    body.email,
    uid,
  ]);

  const updateProfileImageString = `
	UPDATE "STUDENT"
	SET "Profile_Image" = $1
	WHERE "Username" = $2
	`;
  await query(updateProfileImageString, [body.profileImage[0].url, uid]);
  return Response.json({
    code: "SUCCESS",
  });
});
