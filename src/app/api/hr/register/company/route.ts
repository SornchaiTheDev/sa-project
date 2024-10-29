import { createCompany } from "~/backend/models/company-model";
import { createJobA } from "~/backend/models/jobA-model";
import { createUserIncludePhoneNumber } from "~/backend/models/user-model";
import type { Address } from "~/types/address";

export const POST = async (req: Request) => {
  const body = await req.json();

  const {
    title,
    firstName,
    lastName,
    email,
    username,
    category,
    password,
    phone,
    place,
    province,
    amphur,
    tambon,
    bookUrl,
    logoUrl,
    taxId,
    name,
    isVerified,
  } = body;

  const logoURL = logoUrl[0].url;
  const requestedFileURL = bookUrl[0].url;

  const companyAddress: Address = {
    place,
    province,
    amphur,
    tambon,
  };

  try {
    try {
      await createUserIncludePhoneNumber({
        username,
        title,
        lastName,
        firstName,
        email,
        isActive: isVerified,
        phoneNumber: phone,
      });
    } catch (err) {
      throw new Error("Cannot create user");
    }

    let companyId: string | undefined;

    try {
      companyId = await createCompany({
        requestedFile: requestedFileURL,
        isActive: isVerified,
        taxId,
        image: logoURL,
        name,
        address: companyAddress,
        category,
      });
    } catch (err) {
      throw new Error("Cannot create company");
    }

    try {
      await createJobA({
        username,
        password,
        companyId,
      });
    } catch (err) {
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
    message: "Created Job announcer and company successfully",
  });
};
