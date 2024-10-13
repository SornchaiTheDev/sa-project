import { kusdMiddleware } from "~/app/api/_middlewares/kusdMiddleware";
import { JobAnnouncerRepository } from "~/backend/repositories/jobAnnouncerRepository";

export interface CompanyMemberResponse {
  username: string;
  name: string;
  email: string;
  phone: string;
}

export const GET = kusdMiddleware(async (_, __, { params }) => {
  const jobAnnouncerRepo = new JobAnnouncerRepository();

  const members = await jobAnnouncerRepo.getAllUnverified(params.companyId);

  const modMembers: CompanyMemberResponse[] = members.map(
    ({ firstName, lastName, email, phoneNumber, username }) => ({
      username,
      name: firstName + " " + lastName,
      email: email ?? "",
      phone: phoneNumber ?? "",
    }),
  );

  return Response.json({
    members: modMembers,
  });
});
