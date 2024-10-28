import { query } from "~/lib/db";

const reset = async () => {
  const queryString = `
        DROP SCHEMA "ku-job" CASCADE;
        CREATE SCHEMA "ku-job";
`;
  await query(queryString);
  console.log("Reset database successfully");
  process.exit(0);
};

reset();
