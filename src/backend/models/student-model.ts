import { query } from "~/lib/db";
import { Student } from "~/types/student";

export const createStudent = async (student: Student): Promise<void> => {
  const {
    username,
    phoneNumber,
    description,
    gpax,
    dateOfBirth,
    activityHour,
  } = student;

  const queryString = `INSERT INTO "STUDENT" ("Username","Date_Of_Birth","Description","Activity_Hour","GPAX") VALUES ($1,$2,$3,$4,$5) RETURNING *`;

  await query(queryString, [
    username,
    dateOfBirth,
    description,
    activityHour,
    gpax,
  ]);

  const editStudent = `UPDATE "USER" SET "Phone_Number" = $1 WHERE "Username" = $2`;

  await query(editStudent, [phoneNumber, username]);
};

export const getStudent = async (username: string): Promise<Student> => {
  const queryString = `SELECT "Username" AS username,
                              "Description" AS description,
                              "Activity_Hour" AS "activity_hour",
                              "GPAX" AS gpax,
                              "Faculty" AS faculty,
                              "Major" AS major,
                              "Phone_Number" AS "phone_number",
                              "Date_Of_Birth" AS "date_of_birth"
                       FROM "STUDENT" WHERE username = $1
                       LIMIT 1`;

  const res = await query(queryString, [username]);

  const student = res.rows[0];

  return {
    username: student.username,
    description: student.description,
    activityHour: student.activity_hour,
    gpax: student.gpax,
    faculty: student.faculty,
    major: student.major,
    phoneNumber: student.phone_number,
    dateOfBirth: student.date_of_birth,
  };
};

export const isStudentExists = async (username: string): Promise<boolean> => {
  const queryString = `SELECT EXISTS(SELECT 1 FROM "STUDENT" WHERE "Username" = $1)`;
  const res = await query(queryString, [username]);

  return res.rows[0].exists;
};
