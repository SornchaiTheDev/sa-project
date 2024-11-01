import { query } from "~/lib/db";
import { Employee } from "~/types/employee";

export const getUnEvaluatedStudentByCompanyId = async (
  companyId: string,
): Promise<Employee[]> => {
  const queryString = `SELECT
U."Username" AS "username",
S."Profile_Image" AS "profileImage",
U."First_Name" AS "firstName",
U."Last_Name" AS "lastName",
P."Job_Name" AS "positionName",
P."Position_ID" AS "positionID"
FROM "STUDENT_TO_QUALIFICATION_ANNOUNCEMENT" STQA
JOIN "JOB_RECRUITMENT" JR ON STQA."Job_Recruit_ID" = JR."Job_Recruit_ID"
JOIN "USER" U ON U."Username" = JR."STU_Username"
JOIN "POSITION" P ON P."Position_ID" = JR."Position_ID"
JOIN "STUDENT" S ON S."Username" = U."Username"
LEFT JOIN "EVALUATION" E ON E."STU_Username" = U."Username" AND E."Position_ID" = JR."Position_ID"
WHERE "Company_ID" = $1 AND E IS NULL`;

  const res = await query(queryString, [companyId]);
  return res.rows;
};

export const evaluateStudent = async (
  result: Record<string, number>,
  positionId: string,
  jobAUsername: string,
  stdUsername: string,
) => {
  const queryString = `
INSERT INTO "EVALUATION" (
 "Eval_Result",
 "Eval_Date_Time",
 "Position_ID",
 "JOBA_Username",
 "STU_Username"   
) VALUES (
    $1,
    CURRENT_TIMESTAMP,
    $2,
    $3,
    $4
)
`;
  await query(queryString, [result, positionId, jobAUsername, stdUsername]);
};
