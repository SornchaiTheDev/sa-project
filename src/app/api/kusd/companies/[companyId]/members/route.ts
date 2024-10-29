import { kusdMiddleware } from "~/app/api/_middlewares/kusdMiddleware";
import { getAllUnverifyJobAByCompany } from "~/backend/models/jobA-model";

export interface CompanyMemberResponse {
  username: string;
  name: string;
  email: string;
  phone: string;
}

export const GET = kusdMiddleware(async (_, __, { params }) => {
  const members = await getAllUnverifyJobAByCompany(params.companyId);

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
