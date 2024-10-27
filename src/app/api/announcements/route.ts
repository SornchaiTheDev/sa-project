import { replace } from "lodash";
import { query } from "~/lib/db";
import { JobAnnouncement } from "~/types/DTO/jobAnnouncement";

export const GET = async (req: Request) => {
  const queryString = `SELECT DISTINCT
    "JOB_ANNOUNCEMENT"."Job_Announce_ID" AS id,
    "JOB_ANNOUNCEMENT"."Job_Announce_Title" AS title,
    "JOB_ANNOUNCEMENT"."Job_Announce_Description" AS description,
    "APPROVED_COMPANY"."Company_Name" AS companyName,
    "APPROVED_COMPANY"."Company_Address" AS companyAddress,
    "APPROVED_COMPANY"."Company_Image" AS companyImage,
    "JOB_ANNOUNCEMENT"."Job_Announce_Date_Time" AS createdAt
FROM
    "JOB_ANNOUNCEMENT"
    JOIN "APPROVED_COMPANY" ON "JOB_ANNOUNCEMENT"."Company_ID" = "APPROVED_COMPANY"."Company_ID"
    JOIN "RELATION_TAGGED" ON "RELATION_TAGGED"."Company_ID" = "APPROVED_COMPANY"."Company_ID"
    JOIN "POSITION" ON "POSITION"."Job_Announce_ID" = "JOB_ANNOUNCEMENT"."Job_Announce_ID"
WHERE
    CASE
     WHEN array_length($1::text[],1) != 0 THEN "POSITION"."Position_Name" = ANY($1)
     ELSE TRUE
    END
    AND
    "APPROVED_COMPANY"."Company_Address" ->> 'province' LIKE COALESCE(NULLIF($2,''),'%%')  AND
    "APPROVED_COMPANY"."Company_Address" ->> 'amphur' LIKE COALESCE(NULLIF($3,''),'%%') AND
    "APPROVED_COMPANY"."Company_Address" ->> 'tambon' LIKE COALESCE(NULLIF($4,''),'%%') AND
    "RELATION_TAGGED"."Tag_Name" LIKE COALESCE(NULLIF($5,''),'%%') AND
    CASE 
        WHEN NULLIF($6,-1) IS NOT NULL 
        THEN "POSITION"."Job_Mode" = $6 
        ELSE TRUE 
    END 
`;

  const url = new URL(req.url);
  const searchParams = url.searchParams;

  const province = searchParams.get("province") ?? "";
  const amphur = searchParams.get("amphur") ?? "";
  const tambon = searchParams.get("tambon") ?? "";
  const position = searchParams.get("position") ?? "";
  const category = searchParams.get("category") ?? "";
  const jobType = searchParams.get("jobType") ?? "";

  const parsedPoisition = position.split(",").filter((p) => p !== "");

  const replaceAllString = (str: string) => (str === "all" ? "" : str);
  const replaceAllNumber = (str: string) =>
    str === "all" ? -1 : parseInt(str);

  const params: (string | string[] | number)[] = [
    parsedPoisition,
    replaceAllString(province),
    replaceAllString(amphur),
    replaceAllString(tambon),
    replaceAllString(category),
    replaceAllNumber(jobType),
  ];

  const res = await query(queryString, params);

  const announcements: JobAnnouncement[] = [];

  for (const r of res) {
    const queryString = `SELECT 
"Position_Name" AS name,
"Position_Amount" AS amount
FROM "POSITION"
WHERE "Job_Announce_ID" = $1`;

    const positions = await query(queryString, [r.id]);
    const positionList = positions.map((p) => ({
      name: p.name,
      amount: p.amount,
    }));

    announcements.push({
      id: r.id,
      title: r.title,
      description: r.description,
      companyName: r.companyname,
      companyAddress: r.companyaddress,
      companyImage: r.companyimage,
      createdAt: r.createdat,
      positions: positionList,
    });
  }

  return Response.json({
    announcements,
  });
};
