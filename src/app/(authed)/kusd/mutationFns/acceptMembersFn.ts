import axios from "axios";

interface Response {
  code: string;
  message: string;
}

export const acceptMembersFn = async (usernames: string[]) => {
  const res = await axios.post<Response>("/api/kusd/approve/members", {
    usernames,
  });
  return res.data;
};
