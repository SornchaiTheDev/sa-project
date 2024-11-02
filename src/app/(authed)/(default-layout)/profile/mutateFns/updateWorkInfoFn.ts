import axios from "axios";
import { EducationAndWorks } from "~/app/(authed)/(half-layout)/onboarding/educations-and-works/schemas/education-and-works";

export const updateWorkInfoFn = async (workInfo: EducationAndWorks) => {
  await axios.post("/api/nisit/update/work-info", workInfo);
};
