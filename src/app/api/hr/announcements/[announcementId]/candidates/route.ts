import { getAllCandidates } from "~/backend/models/job-register-model";

export const GET = async (
  _: Request,
  { params }: { params: { announcementId: string } },
) => {
  const { announcementId } = params;
  try {
    const candidates = await getAllCandidates(announcementId);

    return Response.json({
      candidates,
    });
  } catch (err) {
    return Response.json(
      {
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
};
