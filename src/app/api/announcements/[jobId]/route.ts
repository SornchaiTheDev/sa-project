import { query } from "~/lib/db";

export const GET = async (
  _: Request,
  { params }: { params: { jobId: string } },
) => {
  const { jobId } = params;
  const queryString = `SELECT "JOB_ANNOUNCEMENT"."Job_Announce_Title" AS "title",
                              "JOB_ANNOUNCEMENT"."Job_Announce_Description" AS "description",
                              "APPROVED_COMPANY"."Company_Name" AS "companyName",
                              "APPROVED_COMPANY"."Company_Image" AS "companyImage",
                              "APPROVED_COMPANY"."Company_Address" AS "companyAddress",
                              "JOB_ANNOUNCEMENT"."Job_Announce_Date_Time" AS "createdAt"
                       FROM "JOB_ANNOUNCEMENT" 
                       JOIN "APPROVED_COMPANY" ON "JOB_ANNOUNCEMENT"."Company_ID" = "APPROVED_COMPANY"."Company_ID"
                       WHERE "Job_Announce_ID" = $1`;

  const announcementRes = await query(queryString, [jobId]);

  const positionQueryString = `SELECT "Job_Position_ID" AS "id",
                                      "Position_Name" AS "name",
                                      "Job_Mode" AS "jobMode",
                                      "Job_Earnings" AS "earnings",
                                      "Position_Amount" AS "amount",
                                      "Job_Position_Detail" AS "description",
                                      "Job_Position_Qualifications" AS "qualification",
                                      "Job_Position_Welfare" AS "welfare"
                                FROM "POSITION"
                                WHERE "Job_Announce_ID" = $1`;

  const positionRes = await query(positionQueryString, [jobId]);

  return Response.json({
    announcement: {
      ...announcementRes[0],
      positions: positionRes,
    },
  });
};
