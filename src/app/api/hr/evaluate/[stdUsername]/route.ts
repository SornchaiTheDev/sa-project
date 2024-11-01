import { jobAMiddleware } from "~/app/api/_middlewares/jobAMiddlware";
import { evaluateStudent } from "~/backend/models/evaluate-model";

interface EvaluatePayload {
  positionID: string;
  result: Record<string, number>;
}

export const POST = jobAMiddleware(async (hrInfo, req, { params }) => {
  const { stdUsername } = params;
  const { username: jobAUsername } = hrInfo;

  const body = (await req.json()) as EvaluatePayload;
  try {
    await evaluateStudent(
      body.result,
      body.positionID,
      jobAUsername,
      stdUsername,
    );

    return Response.json({
      code: "SUCCESS",
    });
  } catch (err) {
    return Response.json({
      code: "FAILED",
    });
  }
});
