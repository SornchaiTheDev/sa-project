import { getAllPositionByAnnouncementID } from "~/backend/models/position-model";

export const GET = async (
  _: Request,
  { params }: { params: { announcementId: string } },
) => {
  const { announcementId } = params;

  try {
    const positions = await getAllPositionByAnnouncementID(announcementId);

    return Response.json({
      positions: positions.map((position) => position.name),
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
