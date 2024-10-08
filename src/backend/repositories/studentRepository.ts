import { query } from "../../lib/db";
import { Student } from "../../types/student";
import { CreateStudent } from "../DTO/studentDTO";

export class StudentRepository {
  public async getByUsername(email: string): Promise<Student | undefined> {
    const text = `
  SELECT * FROM "STUDENT"
  WHERE "STU_Username" = $1
`;

    const values = [email];

    const res = await query(text, values);
    return {
      username: res[0].STU_Username,
      title: res[0].STU_Title,
      firstName: res[0].STU_First_Name,
      lastName: res[0].STU_Last_Name,
      email: res[0].STU_Email_Google,
      isActive: res[0].STU_Active,
      activityHours: res[0].STU_Activity_Hours,
      phoneNumber: res[0].STU_Phone_Number,
      description: res[0].STU_Description,
      gpax: res[0].STU_GPAX,
    };
  }

  public async create(student: CreateStudent): Promise<void> {
    try {
      const text = `
        INSERT INTO "STUDENT" (
          "STU_Username",
          "STU_Title",
          "STU_First_Name",
          "STU_Last_Name",
          "STU_Email_Google"
        ) VALUES ($1, $2, $3, $4, $5)
      `;

      const values = [
        student.username,
        student.title,
        student.firstName,
        student.lastName,
        student.email,
      ];
      await query(text, values);
    } catch (error) {
      console.error("Failed to create student in the database", error);
      throw error;
    }
  }

  public async hasCompletedForm(username: string): Promise<boolean> {
    try {
      const text = `
        SELECT * FROM STUDENT
        WHERE STU_Username = $1 AND
        STU_Activity_Hours IS NOT NULL AND
        STU_Phone_Number IS NOT NULL AND
        STU_Description IS NOT NULL AND
        STU_GPAX IS NOT NULL;
      `;

      const values = [username];
      const query_result = await query(text, values);
      return query_result.length > 0;
    } catch (error) {
      console.error("Failed to fetch student in the database", error);
      throw error;
    }
  }
}
