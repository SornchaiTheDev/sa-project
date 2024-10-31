import { jobAMiddleware } from "~/app/api/_middlewares/jobAMiddlware";
import { notifyCandidate } from "~/backend/models/job-register-model";
import { getJobAByUsername } from "~/backend/models/jobA-model";

interface AcceptStudentApiPayload {
  positionId: string;
}

export const POST = jobAMiddleware(async (hrInfo, req, { params }) => {
  const { username: jobAUsername } = hrInfo;
  const { announcementId, stdUsername } = params;
  const { positionId } = (await req.json()) as AcceptStudentApiPayload;

  const jobA = await getJobAByUsername(jobAUsername);

  if (jobA === null) {
    return Response.json({
      code: "UNAUTHORIZED",
      message: "You aren't allow to request this!",
    });
  }

  const companyId = jobA.companyId;
  try {
    await notifyCandidate({
      companyId,
      jobAnnounceId: announcementId,
      jobAUsername,
      stdUsername,
      positionId,
      qualifyResult: 1,
    });

    return Response.json({
      code: "SUCCESS",
      message: "Accept candidate successfully",
    });
  } catch (err) {
    console.log(err);
    return Response.json(
      {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
});
