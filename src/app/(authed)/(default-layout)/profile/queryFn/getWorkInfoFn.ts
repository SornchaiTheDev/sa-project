import axios from "axios";
import { EducationAndWorks } from "~/app/(authed)/(half-layout)/onboarding/educations-and-works/schemas/education-and-works";

export const getWorkInfoFn = async () => {
  const res = await axios.get<{ workInfo: EducationAndWorks }>(
    `/api/nisit/education`,
  );
  return res.data.workInfo;
};
