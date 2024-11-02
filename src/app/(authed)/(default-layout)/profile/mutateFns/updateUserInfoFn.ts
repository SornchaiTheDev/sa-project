import axios from "axios";
import { UserInfo } from "../schemas/user-info";

export const updateUserInfoFn = async (payload: UserInfo) => {
  await axios.post(`/api/nisit/update/info`, payload);
};
