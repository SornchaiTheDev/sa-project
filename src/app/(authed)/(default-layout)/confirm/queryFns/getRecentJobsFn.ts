import axios from "axios";
import { Job } from "~/types/job";

export const getRecentJobsFn = async () => {
  const res = await axios.get<{ jobs: Job[] }>("/api/nisit/jobs");
  return res.data.jobs;
};
