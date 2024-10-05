import { query } from "../../lib/db";
import { Student } from "../../types/student";

export class StudentRepository {
  public async create(student: Student): Promise<void> {
    try {
      const text = `
        INSERT INTO STUDENT (
          "STU_Username",
          "STU_Title",
          "STU_First_Name",
          "STU_Last_Name",
          "STU_Email_Google",
          "STU_Is_Active",
          "STU_Activity_Hours",
          "STU_Phone_Number",
          "STU_Description",
          "STU_GPAX"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `;
      
      const values = [
        student.username,
        student.title,
        student.firstName,
        student.lastName,
        student.email,
        student.isActive,
        student.activityHours,
        student.phoneNumber,
        student.description,
        student.gpax
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
