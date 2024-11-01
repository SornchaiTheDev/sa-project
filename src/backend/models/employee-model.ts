import { query } from "~/lib/db";
import { Employee } from "~/types/employee";

export const getAllEmployeesInCompany = async (
  companyId: string,
): Promise<Employee[]> => {
  const queryString = `SELECT
U."Username" AS "username",
S."Profile_Image" AS "profileImage",
U."First_Name" AS "firstName",
U."Last_Name" AS "lastName",
P."Job_Name" AS "positionName"
FROM "STUDENT_TO_QUALIFICATION_ANNOUNCEMENT" STQA
JOIN "JOB_RECRUITMENT" JR ON STQA."Job_Recruit_ID" = JR."Job_Recruit_ID"
JOIN "USER" U ON U."Username" = JR."STU_Username"
JOIN "POSITION" P ON P."Position_ID" = JR."Position_ID"
JOIN "STUDENT" S ON S."Username" = U."Username"
AND "Company_ID" = $1`;

  const res = await query(queryString, [companyId]);

  return res.rows;
};
