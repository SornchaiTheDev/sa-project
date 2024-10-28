import { query } from "~/lib/db";
import { KUSD } from "~/types/kusd";

export const createKUSD = async (user: KUSD) => {
  const queryString = `INSERT INTO "USER" ("Username","Title","First_Name","Last_Name","Email_Google","Is_Active") VALUES ($1, $2, $3, $4, $5, 1) RETURNING *`;

  const { email, title, firstName, lastName, username } = user;

  await query(queryString, [username, title, firstName, lastName, email]);

  const insertIntoKUSD = `INSERT INTO "KU_SD" ("Username") VALUES ($1) RETURNING *`;

  await query(insertIntoKUSD, [username]);
};
