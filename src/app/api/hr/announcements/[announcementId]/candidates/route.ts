import {
  getAllCandidates,
  getNotVerifyCandidates,
} from "~/backend/models/job-register-model";
import { Candidate } from "~/types/candidate";

export const GET = async (
  req: Request,
  { params }: { params: { announcementId: string } },
) => {
  const { announcementId } = params;
  const searchParams = new URL(req.url).searchParams;

  const position = searchParams.get("position") ?? "all";
  const status = searchParams.get("status") as "all" | "waiting";

  try {
    let candidates: Candidate[];

    const _position = position === "all" ? "" : position;

    if (status === "all") {
      candidates = await getAllCandidates(announcementId, _position);
    } else {
      candidates = await getNotVerifyCandidates(announcementId, _position);
    }

    return Response.json({
      candidates,
    });
  } catch (err) {
    console.log(err);
    return Response.json(
      {
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
};
