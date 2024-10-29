import { isEmailExists } from "~/backend/models/user-model";

export const GET = async (
  _: Request,
  { params }: { params: { email: string } },
) => {
  const { email } = params;
  try {
    const isExists = await isEmailExists(email);
    const status = isExists ? "EMAIL_EXISTS" : "AVAILABLE";

    return Response.json({
      status,
    });
  } catch (err) {
    console.log(err);
  }
  return Response.json({ message: "Failed to get user" });
};
