import { getStudent } from "~/backend/models/student-model";
import { jwtMiddleware } from "../../_middlewares/jwtMiddleware";
import { UserInfo } from "~/types/userInfo";

export const GET = jwtMiddleware(async (userInfo: UserInfo) => {
  const { uid } = userInfo;
  const student = await getStudent(uid);
  return Response.json({
    student,
  });
});
