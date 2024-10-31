import { query } from "~/lib/db";
import { JobAnnouncement, Position } from "~/types/jobAnnouncement";

export const getRecentJobAnnouncement = async (companyId: string) => {
  const recentJobAnnouncementQuery = `SELECT "JOB_Announce_ID" AS ID
                  FROM "JOB_ANNOUNCEMENT"
                  WHERE "JOBA_Username" = $1
                  ORDER BY "JOB_Announce_Date_Time"
                  DESC LIMIT 1`;

  const res = await query(recentJobAnnouncementQuery, [companyId]);

  return res.rows[0].id;
};

interface JobAnnouncementPayload {
  province: string;
  amphur: string;
  tambon: string;
  positions: string[];
  category: string;
  jobType: number;
}

export const getAllJobAnnouncements = async (
  payload: JobAnnouncementPayload,
): Promise<JobAnnouncement[]> => {
  const queryString = `SELECT DISTINCT
    "JOB_ANNOUNCEMENT"."JOB_Announce_ID" AS id,
    "JOB_ANNOUNCEMENT"."JOB_Announce_Title" AS title,
    "JOB_ANNOUNCEMENT"."JOB_Announce_Description" AS description,
    "JOB_ANNOUNCEMENT"."JOB_Announce_Date_Time" AS createdAt,
    "APPROVED_COMPANY"."Company_Name" AS companyName,
    "APPROVED_COMPANY"."Company_Address" AS companyAddress,
    "APPROVED_COMPANY"."Company_Image" AS companyImage
FROM
    "JOB_ANNOUNCEMENT"
    JOIN "JOB_ANNOUNCER" ON "JOB_ANNOUNCEMENT"."JOBA_Username" = "JOB_ANNOUNCER"."Username"
    JOIN "APPROVED_COMPANY" ON "JOB_ANNOUNCER"."Company_ID" = "APPROVED_COMPANY"."Company_ID"
    JOIN "TAGGING" ON "TAGGING"."Company_ID" = "APPROVED_COMPANY"."Company_ID"
    JOIN "POSITION" ON "POSITION"."JOB_Announce_ID" = "JOB_ANNOUNCEMENT"."JOB_Announce_ID"
WHERE
    CASE
     WHEN array_length($1::text[],1) != 0 THEN "POSITION"."Job_Name" = ANY($1)
     ELSE TRUE
    END
    AND
    "APPROVED_COMPANY"."Company_Address" ->> 'province' LIKE COALESCE(NULLIF($2,''),'%%')  AND
    "APPROVED_COMPANY"."Company_Address" ->> 'amphur' LIKE COALESCE(NULLIF($3,''),'%%') AND
    "APPROVED_COMPANY"."Company_Address" ->> 'tambon' LIKE COALESCE(NULLIF($4,''),'%%') AND
    "TAGGING"."Tag_Name" LIKE COALESCE(NULLIF($5,''),'%%') AND
    CASE 
        WHEN NULLIF($6,-1) IS NOT NULL 
        THEN "POSITION"."Job_Mode" = $6 
        ELSE TRUE 
    END 
`;

  const { province, category, positions, amphur, tambon, jobType } = payload;
  const params: (number | string | string[])[] = [
    positions,
    province,
    amphur,
    tambon,
    category,
    jobType,
  ];

  const res = await query(queryString, params);

  const announcements: JobAnnouncement[] = [];

  for (const r of res.rows) {
    const queryString = `SELECT 
"Position_ID" AS id,
"Job_Mode" AS jobmode,
"Job_Name" AS name,
"Job_Position_Detail" AS description,
"Job_Amount" AS amount,
"Job_Position_Qualifications" AS qualification,
"Job_Position_Welfare" AS welfare,
"Job_Earnings" AS earnings
FROM "POSITION"
WHERE "JOB_Announce_ID" = $1`;

    const positions = await query(queryString, [r.id]);
    const positionList: Position[] = positions.rows.map((p) => ({
      id: p.id,
      name: p.name,
      amount: p.amount,
      description: p.description,
      jobMode: p.jobmode,
      earnings: p.earnings,
      qualification: p.qualification,
      welfare: p.welfare,
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

  return announcements;
};

export const getJobAnnouncementsByCompanyID = async (companyId: string) => {
  const queryString = `SELECT "JOB_Announce_ID" AS id, "JOB_Announce_Title" as title
FROM "JOB_ANNOUNCEMENT"
JOIN "JOB_ANNOUNCER" ON "JOB_ANNOUNCEMENT"."JOBA_Username" = "JOB_ANNOUNCER"."Username"
JOIN "APPROVED_COMPANY" ON "JOB_ANNOUNCER"."Company_ID" = "APPROVED_COMPANY"."Company_ID"
WHERE "APPROVED_COMPANY"."Company_ID" = $1`;

  const res = await query(queryString, [companyId]);
  return res.rows.map((row) => ({ id: row["id"], name: row["title"] }));
};

type JobAnnouncementDetail = Omit<JobAnnouncement, "positions">;

export const getJobAnnouncementsById = async (
  id: string,
): Promise<JobAnnouncementDetail | null> => {
  const queryString = `SELECT "JOB_ANNOUNCEMENT"."JOB_Announce_Title" AS "title",
                              "JOB_ANNOUNCEMENT"."JOB_Announce_Description" AS "description",
                              "APPROVED_COMPANY"."Company_Name" AS "companyName",
                              "APPROVED_COMPANY"."Company_Image" AS "companyImage",
                              "APPROVED_COMPANY"."Company_Address" AS "companyAddress",
                              "JOB_ANNOUNCEMENT"."JOB_Announce_Date_Time" AS "createdAt"
                       FROM "JOB_ANNOUNCEMENT" 
                       JOIN "JOB_ANNOUNCER" ON "JOB_ANNOUNCEMENT"."JOBA_Username" = "JOB_ANNOUNCER"."Username"
                       JOIN "APPROVED_COMPANY" ON "APPROVED_COMPANY"."Company_ID" = "JOB_ANNOUNCER"."Company_ID"
                       WHERE "JOB_Announce_ID" = $1`;

  const announcementRes = await query(queryString, [id]);
  if (announcementRes.rows.length === 0) {
    return null;
  }

  return announcementRes.rows[0];
};

const mapEarningType = (type: number) => {
  switch (type) {
    case 1:
      return "ต่ำกว่า 10,001 ต่อเดือน";
    case 2:
      return "10,001 - 20,000 ต่อเดือน";
    case 3:
      return "20,001 - 30,000 ต่อเดือน";
    case 4:
      return "30,001 - 40,000 ต่อเดือน";
    case 5:
      return "40,001 - 50,000 ต่อเดือน";
    case 6:
      return "มากกว่า 50,000 บาทต่อเดือน";
  }
};

interface CreatePosition {
  name: string;
  type: "full-time" | "part-time";
  amount: number;
  earnings: number;
  description: string;
  qualification: string;
  welfare: string;
}

export interface CreateJobAnnouncement {
  name: string;
  description: string;
  positions: CreatePosition[];
}

export const createJobAnnouncement = async (
  jobAUsername: string,
  payload: CreateJobAnnouncement,
): Promise<void> => {
  const { positions, name, description } = payload;
  const createJobAnnouncement = `
      INSERT INTO "JOB_ANNOUNCEMENT" (
      "JOB_Announce_Title",
      "JOB_Announce_Description",
      "JOB_Announce_Date_Time",
      "JOBA_Username"
      )
      VALUES ($1, $2, CURRENT_TIMESTAMP, $3)
      RETURNING "JOB_Announce_ID"
    `;

  const values: string[] = [name, description, jobAUsername];

  const jobAnnouncementRes = await query(createJobAnnouncement, values);
  const jobAnnouncementID = jobAnnouncementRes.rows[0]["JOB_Announce_ID"];

  const createPositionText = `
      INSERT INTO "POSITION" (
      "Job_Mode",
      "Job_Name",
      "Job_Position_Detail",
      "Job_Amount",
      "Job_Position_Qualifications",
      "Job_Position_Welfare",
      "Job_Earnings",
      "JOB_Announce_ID"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7,$8)
`;

  for (const position of positions) {
    const values: string[] = [
      position.type === "full-time" ? 0 : 1,
      position.name,
      position.description,
      position.amount,
      position.qualification,
      position.welfare,
      mapEarningType(position.earnings),
      jobAnnouncementID,
    ];

    await query(createPositionText, values);
  }
};

export const getAllRecruitedCandidatesByAnnouncementId = async (
  announcementId: string,
) => {
  const queryString = `SELECT "STU_Username" AS username
FROM "JOB_RECRUITMENT" JR
WHERE 
JR."JOB_Announce_ID" = $1`;

  const res = await query(queryString, [announcementId]);

  return res.rows.map((row) => row.username);
};

export const getRemainingCandidatesByAnnouncementId = async (
  jobAUsername: string,
  announcementId: string,
  studentUsernames: string[],
) => {
  const queryString = `SELECT
    PR."STU_Username" AS username
FROM
    "POSITION_REGISTER" PR
    JOIN "JOB_ANNOUNCEMENT" JA ON PR."JOB_Announce_ID" = JA."JOB_Announce_ID"
    LEFT JOIN "JOB_RECRUITMENT" JR ON JR."STU_Username" = PR."STU_Username"
WHERE
    JA."JOBA_Username" = $1 
    AND JA."JOB_Announce_ID" = $2 
    AND PR."STU_Username" != ANY($3)`;

  const res = await query(queryString, [
    jobAUsername,
    announcementId,
    studentUsernames,
  ]);
  return res.rows.map((row) => row.username);
};
