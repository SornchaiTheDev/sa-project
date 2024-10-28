import { execute } from "~/lib/db";

const reset = async () => {
  const query = `
        DROP SCHEMA "ku-job" CASCADE;
        CREATE SCHEMA "ku-job";
`;
  await execute(query);
  console.log("Reset database successfully");
  process.exit(0);
};

reset();
