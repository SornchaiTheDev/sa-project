import {
  enrollToPosition,
  EnrollToPosition,
  isAlreadyEnrolled,
} from "~/backend/models/job-register-model";

export const POST = async (req: Request) => {
  const body = (await req.json()) as EnrollToPosition;

  try {
    const isExists = await isAlreadyEnrolled(body.username, body.jobAnnounceId);
    if (isExists) {
      return Response.json({
        code: "ALREADY_ENROLLED",
        message: "You already enrolled!",
      });
    }

    await enrollToPosition(body);
    return Response.json({
      code: "ENROLL_SUCCESS",
      message: "enroll success!",
    });
  } catch (err) {
    return Response.json({
      code: "ENROLL_FAILED",
      message: "enroll failed!",
    });
  }
};
