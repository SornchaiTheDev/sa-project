import { query } from "~/lib/db";
import type { StudentOnboarding } from "~/types/requests/student-onboarding";
import type { Student } from "~/types/student";

export const createStudent = async (
  student: StudentOnboarding,
): Promise<void> => {
  const {
    username,
    title,
    firstName,
    lastName,
    email,
    phoneNumber,
    description,
    gpax,
    dateOfBirth,
    activityHours,
    faculty,
    major,
    profileImage,
  } = student;

  const createUser = `INSERT INTO "USER" ("Username","Title","First_Name","Last_Name","Email_Google","Phone_Number","Is_Active") VALUES ($1, $2, $3, $4, $5, $6, 1) RETURNING *`;

  await query(createUser, [
    username,
    title,
    firstName,
    lastName,
    email,
    phoneNumber,
  ]);

  const queryString = `INSERT INTO "STUDENT" ("Username","Date_Of_Birth","Description","Activity_Hours","GPAX","Faculty","Major","Profile_Image") VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`;

  await query(queryString, [
    username,
    dateOfBirth,
    description,
    activityHours,
    gpax,
    faculty,
    major,
    profileImage[0].url,
  ]);
};

export const getStudent = async (username: string): Promise<Student> => {
  const queryString = `SELECT "USER"."Username" AS username,
                              "User"."First_Name" AS firstname,
                              "User"."Last_Name" AS lastname,
                              "Description" AS description,
                              "Activity_Hours" AS "activity_hours",
                              "GPAX" AS gpax,
                              "Faculty" AS faculty,
                              "Major" AS major,
                              "Phone_Number" AS "phone_number",
                              "Date_Of_Birth" AS "date_of_birth",
                              "Profile_Image" AS "profile_image"
                       FROM "STUDENT" 
                       JOIN "USER" ON "STUDENT"."Username" = "USER"."Username"
                       WHERE "USER"."Username" = $1
                       LIMIT 1`;

  const res = await query(queryString, [username]);

  const student = res.rows[0];

  return {
    username: student.username,
    firstName: student.firstname,
    lastName: student.lastname,
    description: student.description,
    activityHours: student.activity_hours,
    gpax: student.gpax,
    faculty: student.faculty,
    major: student.major,
    phoneNumber: student.phone_number,
    dateOfBirth: student.date_of_birth,
    profileImage: student.profile_image,
  };
};

export const isStudentExists = async (username: string): Promise<boolean> => {
  const queryString = `SELECT EXISTS(SELECT 1 FROM "STUDENT" WHERE "Username" = $1)`;
  const res = await query(queryString, [username]);

  return res.rows[0].exists;
};

export const hasRemainingConfirmJob = async (username: string) => {
  const queryString = `SELECT EXISTS(SELECT *
FROM "STUDENT" S
JOIN "STUDENT_TO_QUALIFICATION_ANNOUNCEMENT" STQA ON STQA."STU_Username" = S."Username"
WHERE "STU_Username" = $1 AND STQA."Is_STU_Confirm" IS NULL AND STQA."Qualify_Result" = 1)`;

  const res = await query(queryString, [username]);

  return res.rows[0].exists;
};

export const getAllRemainingConfirmJob = async (username: string) => {
  const queryString = `SELECT 
STQA."Qualification_Announce_ID" AS "id",
AC."Company_Name" AS "companyName",
P."Job_Name" AS "jobName"
FROM "STUDENT" S
JOIN "STUDENT_TO_QUALIFICATION_ANNOUNCEMENT" STQA ON STQA."STU_Username" = S."Username"
JOIN "JOB_RECRUITMENT" JR ON JR."Job_Recruit_ID" = STQA."Job_Recruit_ID"
JOIN "POSITION" P ON P."Position_ID" = JR."Position_ID"
JOIN "APPROVED_COMPANY" AC ON AC."Company_ID" = JR."Company_ID"
WHERE STQA."STU_Username" = $1 AND STQA."Is_STU_Confirm" IS NULL AND STQA."Qualify_Result" = 1`;

  const res = await query(queryString, [username]);
  return res.rows;
};
