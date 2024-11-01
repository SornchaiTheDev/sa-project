import axios from "axios";

export const evaluateFn = async (
  username: string,
  positionID: string,
  payload: Record<string, number>,
) => {
  const res = await axios.post(`/api/hr/evaluate/${username}`, {
    positionID,
    result: payload,
  });
  return res.data;
};
