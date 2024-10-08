import pool from "~/lib/db";

export const createTable = async () => {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS "STUDENT" (
          "STU_Username" VARCHAR(50) PRIMARY KEY,
          "STU_Title" VARCHAR(50) NOT NULL,
          "STU_First_Name" VARCHAR(100) NOT NULL,
          "STU_Last_Name" VARCHAR(100) NOT NULL,
          "STU_Email_Google" VARCHAR(50) UNIQUE NOT NULL,
          "STU_Is_Active" INT NOT NULL DEFAULT 1,
          "STU_Activity_Hours" INT,
          "STU_Phone_Number" VARCHAR(10),
          "STU_Description" TEXT,
          "STU_GPAX" FLOAT,
          "STU_Birth_Date" DATE,
          "STU_Faculty" VARCHAR(100),
          "STU_Major" VARCHAR(100)
      );

      CREATE TABLE IF NOT EXISTS "JOB_ANNOUNCER" (
          "JOBA_Username" VARCHAR(50) PRIMARY KEY,
          "Company_ID" uuid NOT NULL,
          "JOBA_Title" VARCHAR(50) NOT NULL,
          "JOBA_First_Name" VARCHAR(100) NOT NULL,
          "JOBA_Last_Name" VARCHAR(100) NOT NULL,
          "JOBA_Is_Active" INT NOT NULL DEFAULT 1,
          "JOBA_Phone_Number" VARCHAR(10)
      );

      CREATE TABLE IF NOT EXISTS "KUSD" (
          "KUSD_Username" VARCHAR(50) PRIMARY KEY,
          "KUSD_Title" VARCHAR(50) NOT NULL,
          "KUSD_First_Name" VARCHAR(100) NOT NULL,
          "KUSD_Last_Name" VARCHAR(100) NOT NULL,
          "KUSD_Email_Google" VARCHAR(50) UNIQUE NOT NULL,
          "KUSD_Is_Active" INT NOT NULL DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS "APPROVED_COMPANY" (
          "Company_ID" uuid PRIMARY KEY,
          "Company_Name" VARCHAR(100),
          "Company_Address" json NOT NULL,
          "Tax_ID" VARCHAR(13) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "JOB_ANNOUNCEMENT" (
          "Job_Announce_ID" uuid PRIMARY KEY,
          "JOBA_Username" VARCHAR(50) NOT NULL,  -- Change to match data type in JOB_ANNOUNCER
          "Job_Announce_Date_Time" TIMESTAMP UNIQUE NOT NULL,
          "Job_Announce_Title" VARCHAR(100) NOT NULL,
          "Job_Announce_Description" VARCHAR(100) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "POSITION" (
          "Job_Position_ID" uuid PRIMARY KEY,
          "Job_Announce_ID" uuid,
          "Job_Mode" INT,
          "Position_Name" VARCHAR(100),
          "Position_Amount" INT,
          "Job_Position_Detail" uuid
      );

      CREATE TABLE IF NOT EXISTS "EVALUATION" (
          "Eval_ID" uuid PRIMARY KEY,
          "STU_Username" VARCHAR(50) NOT NULL,  -- Change to match data type in STUDENT
          "JOBA_Username" VARCHAR(50) NOT NULL,  -- Change to match data type in JOB_ANNOUNCER
          "Eval_Result" INT NOT NULL,
          "Eval_Date_Time" TIMESTAMP UNIQUE NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "QUALIFICATION_ANNOUNCEMENT" (
          "Qualify_Announce_ID" uuid PRIMARY KEY,
          "JOBA_Username" VARCHAR(50) NOT NULL,  -- Change to match data type in JOB_ANNOUNCER
          "Qualify_Result" INT NOT NULL,
          "Qualify_Date_Time" TIMESTAMP UNIQUE NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "EXAMINATION" (
          "Examination_ID" uuid PRIMARY KEY,
          "STU_Username" VARCHAR(50) NOT NULL,  -- Change to match data type in STUDENT
          "Exam_Result" INT NOT NULL,
          "Examination_Date_Time" TIMESTAMP UNIQUE NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "JOB_RECRUIT" (
          "Job_Recruit_ID" uuid PRIMARY KEY,
          "STU_Username" VARCHAR(50) NOT NULL,  -- Change to match data type in STUDENT
          "JOBA_Username" VARCHAR(50) NOT NULL,  -- Change to match data type in JOB_ANNOUNCER
          "Recruit_Position" VARCHAR(100) NOT NULL,
          "Recruit_Start_Date" TIMESTAMP NOT NULL,
          "Recruit_End_Date" TIMESTAMP NOT NULL,
          "Recruit_Date_Time" TIMESTAMP UNIQUE NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "TAG" (
          "Tag_Name" VARCHAR(20) PRIMARY KEY
      );

      CREATE TABLE IF NOT EXISTS "RELATION_TAGGED" (
          "Company_ID" uuid,
          "Tag_Name" VARCHAR(20),
          PRIMARY KEY ("Company_ID", "Tag_Name")
      );

      CREATE TABLE IF NOT EXISTS "RELATION_RECEIVE_QUALIFICATION" (
          "STU_Username" VARCHAR(50),
          "Qualify_Announce_ID" uuid,
          PRIMARY KEY ("STU_Username", "Qualify_Announce_ID")
      );

      CREATE TABLE IF NOT EXISTS "RELATION_PROVIDE_EXAM" (
          "JOBA_Username" VARCHAR(50),
          "Examination_ID" uuid,
          PRIMARY KEY ("JOBA_Username", "Examination_ID")
      );

      CREATE TABLE IF NOT EXISTS "RELATION_VALIDATE" (
          "JOBA_Username" VARCHAR(50),  -- Change to match data type in JOB_ANNOUNCER
          "KUSD_Username" VARCHAR(50),   -- Change to match data type in KUSD
          PRIMARY KEY ("JOBA_Username", "KUSD_Username")
      );

      ALTER TABLE "JOB_ANNOUNCER" ADD FOREIGN KEY ("Company_ID") REFERENCES "APPROVED_COMPANY" ("Company_ID");

      ALTER TABLE "RELATION_TAGGED" ADD FOREIGN KEY ("Company_ID") REFERENCES "APPROVED_COMPANY" ("Company_ID");

      ALTER TABLE "RELATION_TAGGED" ADD FOREIGN KEY ("Tag_Name") REFERENCES "TAG" ("Tag_Name");

      ALTER TABLE "RELATION_VALIDATE" ADD FOREIGN KEY ("JOBA_Username") REFERENCES "JOB_ANNOUNCER" ("JOBA_Username");

      ALTER TABLE "RELATION_VALIDATE" ADD FOREIGN KEY ("KUSD_Username") REFERENCES "KUSD" ("KUSD_Username");

      ALTER TABLE "JOB_ANNOUNCEMENT" ADD FOREIGN KEY ("JOBA_Username") REFERENCES "JOB_ANNOUNCER" ("JOBA_Username");

      ALTER TABLE "POSITION" ADD FOREIGN KEY ("Job_Announce_ID") REFERENCES "JOB_ANNOUNCEMENT" ("Job_Announce_ID");

      ALTER TABLE "EVALUATION" ADD FOREIGN KEY ("JOBA_Username") REFERENCES "JOB_ANNOUNCER" ("JOBA_Username");

      ALTER TABLE "EVALUATION" ADD FOREIGN KEY ("STU_Username") REFERENCES "STUDENT" ("STU_Username");

      ALTER TABLE "QUALIFICATION_ANNOUNCEMENT" ADD FOREIGN KEY ("JOBA_Username") REFERENCES "JOB_ANNOUNCER" ("JOBA_Username");

      ALTER TABLE "RELATION_RECEIVE_QUALIFICATION" ADD FOREIGN KEY ("STU_Username") REFERENCES "STUDENT" ("STU_Username");

      ALTER TABLE "RELATION_RECEIVE_QUALIFICATION" ADD FOREIGN KEY ("Qualify_Announce_ID") REFERENCES "QUALIFICATION_ANNOUNCEMENT" ("Qualify_Announce_ID");

      ALTER TABLE "EXAMINATION" ADD FOREIGN KEY ("STU_Username") REFERENCES "STUDENT" ("STU_Username");

      ALTER TABLE "JOB_RECRUIT" ADD FOREIGN KEY ("STU_Username") REFERENCES "STUDENT" ("STU_Username");

      ALTER TABLE "JOB_RECRUIT" ADD FOREIGN KEY ("JOBA_Username") REFERENCES "JOB_ANNOUNCER" ("JOBA_Username");

      ALTER TABLE "RELATION_PROVIDE_EXAM" ADD FOREIGN KEY ("JOBA_Username") REFERENCES "JOB_ANNOUNCER" ("JOBA_Username");

      ALTER TABLE "RELATION_PROVIDE_EXAM" ADD FOREIGN KEY ("Examination_ID") REFERENCES "EXAMINATION" ("Examination_ID");
    `;

    await pool.query(createTableQuery);

    console.log("Created all tables!");
    process.exit(0);
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

createTable();
