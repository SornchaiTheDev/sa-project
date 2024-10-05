import { ApprovedCompany } from "../types/approvedCompany";

export const createApprovedCompany = async (approvedCompany: ApprovedCompany): Promise<void> => {
  try {
    const response = await fetch(`/api/approved-companies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(approvedCompany),
    });

    if (!response.ok) {
      throw new Error("Failed to create approved company");
    }
  } catch (error) {
    console.error("Error creating approved company: ", error);
    throw error;
  }
};
