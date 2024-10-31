import axios from "axios";
import { Student } from "~/types/student";

export const getStudent = async (username: string) => {
  const res = await axios.get<{ student: Student }>(`/api/nisit/${username}`);
  return res.data.student;
};
