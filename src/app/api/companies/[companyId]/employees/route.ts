import { getJobAByUsername } from "~/backend/models/jobA-model";
import { getUnEvaluatedStudentByCompanyId } from "~/backend/models/evaluate-model";
import { jobAMiddleware } from "~/app/api/_middlewares/jobAMiddlware";
import { getAllEmployeesInCompany } from "~/backend/models/employee-model";

export const GET = jobAMiddleware(async (hrInfo, req: Request) => {
  const searchParams = new URL(req.url).searchParams;

  const show = searchParams.get("show") || "all";

  const { username } = hrInfo;
  const jobA = await getJobAByUsername(username);
  if (jobA === null) {
    return Response.json(
      {
        message: "Job announcer not found",
        code: "UNATHORIZED",
      },
      { status: 401 },
    );
  }

  if (show === "un-evaluated") {
    const students = await getUnEvaluatedStudentByCompanyId(jobA?.companyId);

    return Response.json({
      employees: students,
    });
  } else {
    const employees = await getAllEmployeesInCompany(jobA?.companyId);

    return Response.json({ employees });
  }
});
