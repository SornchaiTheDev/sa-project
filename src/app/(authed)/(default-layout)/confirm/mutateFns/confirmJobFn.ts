import axios from "axios";

export interface ConfirmJobPayload {
  id: string;
  status: number;
}

export const confirmJobFn = async (payload: ConfirmJobPayload[]) => {
  const res = await axios.post("/api/nisit/confirmJob", payload);
  return res.data;
};
