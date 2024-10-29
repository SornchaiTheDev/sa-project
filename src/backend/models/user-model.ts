import { query } from "~/lib/db";
import type { User } from "~/types/user";

type CreateUser = Omit<User, "phoneNumber">;

export const createUser = async (user: CreateUser): Promise<string> => {
  const queryString = `INSERT INTO "USER" (
                                        "Username",
                                        "Title",
                                        "First_Name",
                                        "Last_Name",
                                        "Email_Google",
                                        "Is_Active"
                       ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING "Username"`;

  const { email, title, firstName, lastName, username, isActive } = user;

  const _isActive = isActive ? 1 : 0;

  const res = await query(queryString, [
    username,
    title,
    firstName,
    lastName,
    email,
    _isActive,
  ]);

  return res.rows[0].Username;
};

export const createUserIncludePhoneNumber = async (
  user: User,
): Promise<string> => {
  const { username, isActive, email, firstName, lastName, title, phoneNumber } =
    user;

  await createUser({ username, isActive, email, firstName, lastName, title });

  const queryString = `UPDATE "USER" SET "Phone_Number" = $1 WHERE "Username" = $2 RETURNING "Username"`;

  const res = await query(queryString, [phoneNumber, username]);

  return res.rows[0].Username;
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

export const isEmailExists = async (email: string): Promise<boolean> => {
  const queryString = `SELECT EXISTS(SELECT 1 FROM "USER" WHERE "Email_Google" = $1)`;
  const res = await query(queryString, [email]);

  return res.rows[0].exists;
};
