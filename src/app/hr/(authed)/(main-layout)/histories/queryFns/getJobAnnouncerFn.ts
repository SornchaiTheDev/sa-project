import axios from "axios";
import { JobAnnouncer } from "~/types/jobAnnouncer";

export const getJobAnnouncerFn = async () => {
  const res = await axios.get<JobAnnouncer>("/api/hr");
  return res.data;
};
