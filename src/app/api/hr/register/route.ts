import { createJobA } from "~/backend/models/jobA-model";
import { createUserIncludePhoneNumber } from "~/backend/models/user-model";
import { ConnectJobAWithCompany } from "~/types/jobAnnouncer";

export const POST = async (req: Request) => {
  const body = (await req.json()) as ConnectJobAWithCompany;

  const {
    username,
    title,
    lastName,
    firstName,
    email,
    password,
    companyId,
    phoneNumber,
  } = body;
  try {
    try {
      await createUserIncludePhoneNumber({
        username,
        title,
        lastName,
        firstName,
        email,
        isActive: 0,
        phoneNumber,
      });
    } catch (err) {
      throw new Error("Cannot create user");
    }

    try {
      await createJobA({
        username,
        password,
        companyId,
      });
    } catch (err) {
      console.log(err);
      throw new Error("Cannot create Job announcer");
    }
  } catch (err) {
    if (err instanceof Error) {
      return Response.json(
        {
          code: "INTERNAL_SERVER_ERROR",
          message: err.message,
        },
        { status: 500 },
      );
    }
  }

  return Response.json({
    code: "CREATED",
    message: "Created Job announcer and connect with company successfully",
  });
};
