import { JobAnnouncerRepository } from "~/backend/repositories/jobAnnouncerRepository";

export const GET = async (_:Request,{params }: {params: {username : string}}) => {
  const { username } = params;
  const jobA = new JobAnnouncerRepository();
  try {
    const status = await jobA.checkUsername(username);
    return Response.json({
      status,
    });
  } catch (err) {
    console.log(err);
  }
  return Response.json({ message: "Failed to get user" });
}
