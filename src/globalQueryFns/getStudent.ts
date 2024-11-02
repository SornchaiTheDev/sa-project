import axios from "axios";
import { Student } from "~/types/student";

export const getStudent = async () => {
  const res = await axios.get<{ student: Student }>(`/api/nisit`);
  return res.data.student;
};
