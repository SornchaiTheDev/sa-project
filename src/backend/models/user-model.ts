import { query } from "~/lib/db";
import type { User } from "~/types/user";

type CreateUser = Omit<User, "isActive" | "phoneNumber">;

export const createUser = async (user: CreateUser): Promise<void> => {
  const queryString = `INSERT INTO "USER" ("Username","Title","First_Name","Last_Name","Email_Google","Is_Active") VALUES ($1, $2, $3, $4, $5, 1) RETURNING *`;

  const { email, title, firstName, lastName, username } = user;

  await query(queryString, [username, title, firstName, lastName, email]);
};

export const getUser = async (username: string): Promise<User> => {
  const queryString = `SELECT "Username" AS username,
                 	      "Title" AS title,
	                      "First_Name" AS "firstName",
			      "Last_Name" AS "lastName",
    			      "Email_Google" AS email,
			      "Phone_Number" AS "phoneNumber",
                              "Is_Active" AS "isActive"
	               FROM "USER"`;

  const res = await query(queryString, [username]);

  const user = res.rows[0];

  return {
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    title: user.title,
    isActive: user.isActive,
  };
};

export const isUserExists = async (username: string): Promise<boolean> => {
  const queryString = `SELECT EXISTS(SELECT 1 FROM "USER" WHERE "Username" = $1)`;
  const res = await query(queryString, [username]);

  return res.rows[0].exists;
};
