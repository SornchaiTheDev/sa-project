import { isUserExists } from "~/backend/models/user-model";

export const GET = async (
  _: Request,
  { params }: { params: { username: string } },
) => {
  const { username } = params;
  try {
    const isExists = await isUserExists(username);
    const status = isExists ? "USERNAME_EXISTS" : "AVAILABLE";

    return Response.json({
      status,
    });
  } catch (err) {
    console.log(err);
  }
  return Response.json({ message: "Failed to get user" });
};
