import axios from "axios";

interface Response {
  code: string;
  message: string;
}

export const rejectMembersFn = async (usernames: string[]) => {
  const res = await axios.post<Response>("/api/kusd/reject/members", {
    usernames,
  });
  return res.data;
};
