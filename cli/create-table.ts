import { query } from "~/lib/db";

export const createTable = async () => {
  try {
    const createTableQuery = `
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";

    CREATE TABLE "USER" (
        "Username" VARCHAR(100) PRIMARY KEY,
        "Title" VARCHAR(6) NOT NULL,
        "First_Name" VARCHAR(100) NOT NULL,
        "Last_Name" VARCHAR(100) NOT NULL,
        "Phone_Number" VARCHAR(10),
        "Email_Google" VARCHAR(100) NOT NULL,
        "Is_Active" INT NOT NULL CHECK ("Is_Active" IN (0, 1))
    );

    CREATE TABLE "KU_SD" (
        "Username" VARCHAR(100) PRIMARY KEY
    );

    CREATE TABLE "APPROVED_COMPANY" (
        "Company_ID" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "Company_Name" VARCHAR(100) NOT NULL,
        "Company_Address" JSONB NOT NULL,
        "Company_Image" TEXT,
        "Tax_ID" VARCHAR(13) NOT NULL,
        "Requested_File" TEXT NOT NULL,
        "Company_Is_Active" INT NOT NULL CHECK ("Company_Is_Active" IN (0, 1)),
        "Last_Update_Date" TIMESTAMP
    );

    CREATE TABLE "JOB_ANNOUNCER" (
        "Username" VARCHAR(100) PRIMARY KEY,
        "Company_ID" UUID NOT NULL,
        "Password" VARCHAR(100) NOT NULL,
        "Last_Update_Date" TIMESTAMP,
        "Approve_Request_Date" TIMESTAMP,
        "Validated_By" VARCHAR(100)
    );

    CREATE TABLE "STUDENT" (
        "Username" VARCHAR(100) PRIMARY KEY,
        "Description" TEXT,
        "Activity_Hours" JSON,
        "GPAX" VARCHAR(4) NOT NULL,
        "Faculty" VARCHAR(100) NOT NULL,
        "Major" VARCHAR(100) NOT NULL,
        "Date_Of_Birth" Date NOT NULL,
        "Profile_Image" TEXT
    );

    CREATE TABLE "POSITION" (
        "Position_ID" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "Job_Mode" INT NOT NULL,
        "Job_Name" VARCHAR(100) NOT NULL,
        "Job_Position_Detail" TEXT NOT NULL,
        "Job_Amount" INT NOT NULL,
        "Job_Position_Qualifications" TEXT NOT NULL,
        "Job_Position_Welfare" TEXT NOT NULL,
        "Job_Earnings" VARCHAR(30) NOT NULL,
        "JOB_Announce_ID" UUID NULL
    );

    CREATE TABLE "JOB_ANNOUNCEMENT" (
        "JOB_Announce_ID" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "JOB_Announce_Title" VARCHAR(100) NOT NULL,
        "JOB_Announce_Description" TEXT NOT NULL,
        "JOB_Announce_Date_Time" TIMESTAMP NOT NULL,
        "JOBA_Username" VARCHAR(100) NOT NULL
    );

    CREATE TABLE "JOB_RECRUITMENT" (
        "Job_Recruit_ID" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "JOBA_Username" VARCHAR(100) NOT NULL,
        "Position_ID" UUID NOT NULL,
        "STU_Username" VARCHAR(100) NOT NULL,
        "JOB_Announce_ID" UUID NOT NULL,
        "Company_ID" UUID NOT NULL
    );

    CREATE TABLE "STUDENT_TO_QUALIFICATION_ANNOUNCEMENT" (
        "Qualification_Announce_ID" UUID DEFAULT gen_random_uuid(),
        "STU_Username" VARCHAR(100),
        "Qualify_Result" INT NOT NULL,
        "Qualification_Expired_Date_Time" TIMESTAMP NOT NULL,
        "Is_STU_Confirm" INT,
        "Job_Recruit_ID" UUID NOT NULL,
        PRIMARY KEY ("Qualification_Announce_ID", "STU_Username")
    );

    CREATE TABLE "EVALUATION" (
        "Eval_ID" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "Eval_Result" JSONB NOT NULL,
        "Eval_Date_Time" TIMESTAMP NOT NULL,
        "Position_ID" UUID NOT NULL,
        "JOBA_Username" VARCHAR(100) NOT NULL,
        "STU_Username" VARCHAR(100) NOT NULL,
        FOREIGN KEY ("Position_ID") REFERENCES "POSITION"("Position_ID")
    );

    CREATE TABLE "TAG" (
        "Tag_Name" VARCHAR(20) PRIMARY KEY
    );

    CREATE TABLE "TAGGING" (
        "Tag_Name" VARCHAR(20),
        "Company_ID" UUID,
        PRIMARY KEY ("Tag_Name", "Company_ID")
    );

    CREATE TABLE "POSITION_REGISTER" (
        "Position_ID" UUID,
        "STU_Username" VARCHAR(100),
        "JOB_Announce_ID" UUID, 
        PRIMARY KEY ("Position_ID", "STU_Username", "JOB_Announce_ID"),
        FOREIGN KEY ("Position_ID") REFERENCES "POSITION"("Position_ID"),
        FOREIGN KEY ("STU_Username") REFERENCES "STUDENT"("Username"),
        FOREIGN KEY ("JOB_Announce_ID") REFERENCES "JOB_ANNOUNCEMENT"("JOB_Announce_ID")
    );

    ALTER TABLE "KU_SD"
        ADD CONSTRAINT fk_kusd_user FOREIGN KEY ("Username") REFERENCES "USER"("Username");

    ALTER TABLE "JOB_ANNOUNCER"
        ADD CONSTRAINT fk_announcer_user FOREIGN KEY ("Username") REFERENCES "USER"("Username"),
        ADD CONSTRAINT fk_announcer_company FOREIGN KEY ("Company_ID") REFERENCES "APPROVED_COMPANY"("Company_ID");

    ALTER TABLE "STUDENT"
        ADD CONSTRAINT fk_student_user FOREIGN KEY ("Username") REFERENCES "USER"("Username");

    ALTER TABLE "POSITION"
        ADD CONSTRAINT fk_position_announcement FOREIGN KEY ("JOB_Announce_ID") REFERENCES "JOB_ANNOUNCEMENT"("JOB_Announce_ID");

    ALTER TABLE "JOB_ANNOUNCEMENT"
        ADD CONSTRAINT fk_announcement_announcer FOREIGN KEY ("JOBA_Username") REFERENCES "JOB_ANNOUNCER"("Username");

    ALTER TABLE "JOB_RECRUITMENT"
        ADD CONSTRAINT fk_recruitment_announcer FOREIGN KEY ("JOBA_Username") REFERENCES "JOB_ANNOUNCER"("Username"),
        ADD CONSTRAINT fk_recruitment_position FOREIGN KEY ("Position_ID") REFERENCES "POSITION"("Position_ID"),
        ADD CONSTRAINT fk_recruitment_student FOREIGN KEY ("STU_Username") REFERENCES "STUDENT"("Username"),
        ADD CONSTRAINT fk_recruitment_job_announce_id FOREIGN KEY ("JOB_Announce_ID") REFERENCES "JOB_ANNOUNCEMENT"("JOB_Announce_ID"),
        ADD CONSTRAINT fk_recruitment_company_id FOREIGN KEY ("Company_ID") REFERENCES "APPROVED_COMPANY"("Company_ID");


    ALTER TABLE "STUDENT_TO_QUALIFICATION_ANNOUNCEMENT"
        ADD CONSTRAINT fk_stu_qual_student FOREIGN KEY ("STU_Username") REFERENCES "STUDENT"("Username"),
        ADD CONSTRAINT fk_stu_job_recruit_id FOREIGN KEY ("Job_Recruit_ID") REFERENCES "JOB_RECRUITMENT"("Job_Recruit_ID");

    ALTER TABLE "EVALUATION"
        ADD CONSTRAINT fk_evaluation_position FOREIGN KEY ("Position_ID") REFERENCES "POSITION"("Position_ID"),
        ADD CONSTRAINT fk_evaluation_announcer FOREIGN KEY ("JOBA_Username") REFERENCES "JOB_ANNOUNCER"("Username");

    ALTER TABLE "TAGGING"
        ADD CONSTRAINT fk_tagging_tag FOREIGN KEY ("Tag_Name") REFERENCES "TAG"("Tag_Name"),
        ADD CONSTRAINT fk_tagging_company FOREIGN KEY ("Company_ID") REFERENCES "APPROVED_COMPANY"("Company_ID");
    `;

    await query(createTableQuery);

    console.log("Created all tables!");
    process.exit(0);
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

createTable();
